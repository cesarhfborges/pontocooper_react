import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../services/authService';

interface Storage {
  _token: string;
  _refresh: string;
}

type AuthContextData = {
  token?: string;
  refresh?: string;
  loading: boolean;
  signIn(data: {username: string; password: string}): Promise<void>;
  signOut(): void;
  refreshToken(token: string): Promise<void>;
  isLogged(): boolean;
  setToken: Dispatch<SetStateAction<string | undefined>>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<any> = ({children}: any) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [refresh, setRefresh] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  // const [state, dispatch] = useReducer(reducer, initialState || {});

  const loadStorageData = async (): Promise<void> => {
    try {
      const _store: any = await AsyncStorage.getItem('@Credentials');
      const {_token, _refresh}: Storage = JSON.parse(_store);
      await setToken(_token);
      await setRefresh(_refresh);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  };

  useEffect(() => {
    loadStorageData()
      .then(() => {
        setLoading(false);
        // console.log('==================================================================');
        // console.log('==================================================================');
        // console.log('==================================================================');
        // console.log('==================================================================');
        // console.log('=====> AuthContext effect LOGGED ', format(new Date(), 'HH:mm:ss'));
        // console.log(token, refresh);
      })
      .catch(() => {
        setLoading(false);
        // console.log('==================================================================');
        // console.log('==================================================================');
        // console.log('==================================================================');
        // console.log('==================================================================');
        // console.log('=====> AuthContext effect UNLOGGED ', format(new Date(), 'HH:mm:ss'));
        // console.log(token, refresh);
      });
  }, []);

  const refreshToken = async (auth: string) => {
    const _store = {_token: auth, _refresh: refresh};
    await AsyncStorage.setItem('@Credentials', JSON.stringify(_store));
    await setToken(auth);
    return Promise.resolve();
  };

  const signIn = async (data?: {username: string; password: string}): Promise<void> => {
    if (data) {
      const _response = await login(data);
      setRefresh(_response.refresh);
      setToken(_response.access);
      const _store = {_token: _response.access, _refresh: _response.refresh};
      await AsyncStorage.setItem('@Credentials', JSON.stringify(_store));
      return Promise.resolve();
    } else {
      throw new Error('Verifique as credenciais');
    }
  };

  const signOut = async () => {
    await setRefresh(undefined);
    await setToken(undefined);
    await AsyncStorage.removeItem('@Credentials');
  };

  const isLogged = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        refresh,
        loading,
        refreshToken,
        setToken,
        signIn,
        signOut,
        isLogged,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export {AuthContext, AuthProvider, useAuth};
