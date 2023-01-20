import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from './AuthContext';
import {enviroment} from '../services/enviroment';
import axios, {Axios} from 'axios';
import createAuthRefreshInterceptor, {AxiosAuthRefreshOptions} from 'axios-auth-refresh';
import {format} from 'date-fns';

type AxiosContextData = {
  service: Axios;
};

const defaultHeaders: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  origin: 'https://portal.coopersystem.com.br',
  referer: 'https://portal.coopersystem.com.br',
};

const service = axios.create({
  baseURL: enviroment.baseUrl,
  headers: defaultHeaders,
  timeout: 5000,
});

const AxiosContext = createContext<AxiosContextData>({} as AxiosContextData);
const {Provider} = AxiosContext;

const AxiosProvider = ({children}: any) => {
  const {loading, token, refresh, refreshToken, signOut} = useAuth();

  const [sessionToken, setSessionToken] = useState(token);

  const refreshAuthLogic = async () => {
    try {
      const serviceRefresh = axios.create({
        baseURL: enviroment.baseUrl,
        headers: defaultHeaders,
        timeout: 5000,
      });
      const refreshResponse: any = await serviceRefresh.post<any>('/auth/refresh/', {
        refresh: refresh,
      });
      await setSessionToken(refreshResponse.data.access);
      await refreshToken(refreshResponse.data.access);
      return Promise.resolve();
    } catch (e) {
      signOut();
      return Promise.reject();
    }
  };

  const options: AxiosAuthRefreshOptions = {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true,
    interceptNetworkError: true,
    retryInstance: service,
  };

  createAuthRefreshInterceptor(service, refreshAuthLogic, options);

  service.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      if (error.response.status === 401) {
        return Promise.reject(error);
      }
    },
  );

  service.interceptors.request.use(
    async (config: any) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    if (!loading && token !== sessionToken) {
      setSessionToken(token);
      service.interceptors.request.clear();
      if (token && sessionToken) {
        service.interceptors.request.use(
          async (config: any) => {
            config.headers.Authorization = `Bearer ${sessionToken}`;
            return config;
          },
          error => {
            return Promise.reject(error);
          },
        );
      }
    }
    console.log('==================================================================');
    console.log('Axios Provider effect: ', format(new Date(), 'HH:mm:ss'));
    console.log('sessionToken: ', sessionToken);
  }, [loading, refresh, token, sessionToken, setSessionToken]);

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
