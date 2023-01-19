import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from './AuthContext';
import {enviroment} from '../services/enviroment';
import axios, {Axios} from 'axios';
import createAuthRefreshInterceptor, {AxiosAuthRefreshOptions} from 'axios-auth-refresh';

type AxiosContextData = {
  service: Axios;
};

const defaultHeaders: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  origin: 'https://portal.coopersystem.com.br',
  referer: 'https://portal.coopersystem.com.br',
  Returnerror: 'Yes', // used only with mockoon
};

const service = axios.create({
  baseURL: enviroment.baseUrl,
  headers: defaultHeaders,
  timeout: 5000,
});

const AxiosContext = createContext<AxiosContextData>({} as AxiosContextData);
const {Provider} = AxiosContext;

const AxiosProvider = ({children}: any) => {
  const {token, refreshToken, refresh, signOut} = useAuth();

  const [sessionToken, setSessionToken] = useState(token);

  service.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      if (error.response.status === 401) {
        // signOut();
        return Promise.reject(error);
      }
    },
  );
  service.interceptors.request.use(
    async (config: any) => {
      config.headers.Authorization = `Bearer ${sessionToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    service.interceptors.request.clear();
    service.interceptors.request.use(
      async (config: any) => {
        config.headers.Authorization = `Bearer ${sessionToken}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }, [sessionToken, refresh, token]);

  const refreshAuthLogic = async () => {
    try {
      const serviceRefresh = axios.create({
        baseURL: enviroment.baseUrl,
        headers: defaultHeaders,
        timeout: 5000,
      });
      const data: any = {refresh: refresh};
      const refreshResponse: any = await serviceRefresh.post<any>('/auth/refresh/', data);
      await refreshToken(refreshResponse.data.access);
      setSessionToken(refreshResponse.data.access);
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
