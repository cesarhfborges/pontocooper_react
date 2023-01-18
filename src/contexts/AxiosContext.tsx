import React, {createContext, useContext} from 'react';
import axios, {Axios} from 'axios';
import {useAuth} from './AuthContext';

type AxiosContextData = {
  service: Axios;
};

const AxiosContext = createContext<AxiosContextData>({} as AxiosContextData);
const {Provider} = AxiosContext;

const AxiosProvider = ({children}: any) => {
  const {token, signOut} = useAuth();

  const service = axios.create({
    baseURL: 'https://api.portal.coopersystem.com.br/api/v1',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
    },
    timeout: 5000,
  });

  service.interceptors.request.use(config => {
    console.log('=======================================================');
    console.log('=======================================================');
    console.log('=======================================================');
    console.log('NEW REQUEST');
    console.log('date: ', new Date().toString());
    console.log('headers: ', config.headers);
    // if (token) {
    //   const conf: any = {
    //     ...config,
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       'X-Requested-With': 'XMLHttpRequest',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   return conf as AxiosRequestConfig;
    // }
    return config;
  });

  service.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      // Alert.alert(error);
      console.log('request error: ', error);
      if (error.response.status === 401) {
        signOut();
        return Promise.reject(error);
      }
    },
  );

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
