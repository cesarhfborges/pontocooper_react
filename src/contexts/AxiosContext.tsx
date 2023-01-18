import React, {createContext, useContext} from 'react';
import axios, {Axios, AxiosRequestConfig} from 'axios';
import {AuthContext} from './AuthContext';
import { Alert } from "react-native";

type AxiosContextData = {
  service: Axios;
};

const AxiosContext = createContext<AxiosContextData>({} as AxiosContextData);
const {Provider} = AxiosContext;

const AxiosProvider = ({children}: any) => {
  const authContext = useContext(AuthContext);

  const service = axios.create({
    baseURL: 'https://api.portal.coopersystem.com.br/api/v1',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 5000,
  });

  service.interceptors.request.use(config => {
    if (authContext.isLogged()) {
      const conf: any = {
        ...config,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${authContext.token}`,
        },
      };
      console.log('axios headers: ', conf.headers);
      console.log('logged: ', authContext.isLogged());
      console.log('token: ', authContext.token);
      return conf as AxiosRequestConfig;
    }
    return config;
  });

  service.interceptors.response.use(
    response => {
      console.log('===========================================================');
      console.log('response.headers: ', response.headers);
      return response.data;
    },
    error => {
      Alert.alert(error);
      if (error.response.status === 401) {
        authContext.signOut();
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
