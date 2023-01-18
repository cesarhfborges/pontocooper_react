import React, {createContext, useContext} from 'react';
import axios, {Axios, AxiosRequestConfig} from 'axios';
import createAuthRefreshInterceptor, {AxiosAuthRefreshOptions} from 'axios-auth-refresh';
import {AuthContext, useAuth} from './AuthContext';

type AxiosContextData = {
  service: Axios;
};

const AxiosContext = createContext<AxiosContextData>({} as AxiosContextData);
const {Provider} = AxiosContext;

const defaultHeaders: any = {
  // Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

const AxiosProvider = ({children}: any) => {
  const authContext = useContext(AuthContext);
  const {refreshToken} = useContext(AuthContext);

  const service = axios.create({
    baseURL: 'https://api.portal.coopersystem.com.br/api/v1',
    headers: defaultHeaders,
    timeout: 5000,
  });

  service.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      // Alert.alert(error);
      console.log('request error: ', error);
      if (error.response.status === 401) {
        // signOut();
        return Promise.reject(error);
      }
    },
  );

  service.interceptors.request.use(
    (config: any) => {
      console.log('=======================================================');
      console.log('=======================================================');
      console.log('=======================================================');
      console.log('NEW REQUEST');
      console.log('date: ', new Date().toString());
      console.log('headers: ', config.headers);
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = (failedRequest: any) => {
    console.log('failedRequest: ', failedRequest);
    const serviceRefresh = axios.create({
      baseURL: 'https://api.portal.coopersystem.com.br/api/v1',
      headers: defaultHeaders,
      timeout: 5000,
    });
    const data: any = {refresh: authContext.refresh};
    return serviceRefresh.post<any>('/auth/refresh/', data).then(refreshResponse => {
      refreshToken(refreshResponse.data.access);
    });
  };

  const options: AxiosAuthRefreshOptions = {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true,
    interceptNetworkError: true,
  };

  createAuthRefreshInterceptor(service, refreshAuthLogic, options);

  // service.interceptors.request.use(config => {
  //   console.log('=======================================================');
  //   console.log('=======================================================');
  //   console.log('=======================================================');
  //   console.log('NEW REQUEST');
  //   console.log('date: ', new Date().toString());
  //   console.log('headers: ', config.headers);
  //   // if (token) {
  //   //   const conf: any = {
  //   //     ...config,
  //   //     headers: {
  //   //       Accept: 'application/json',
  //   //       'Content-Type': 'application/json',
  //   //       'X-Requested-With': 'XMLHttpRequest',
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   };
  //   //   return conf as AxiosRequestConfig;
  //   // }
  //   return config;
  // });

  return <Provider value={{service: service}}>{children}</Provider>;
};

function useAxios(): AxiosContextData {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return context;
}

export {AxiosContext, AxiosProvider, useAxios};
