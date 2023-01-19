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
  const [refresh, setRefresh] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadStorageData = async () => {
    const _store = await AsyncStorage.getItem('@Credentials');
    if (_store) {
      const {_token, _refresh} = JSON.parse(_store);
      setToken(_token);
      setRefresh(_refresh);
    }
    return Promise.resolve();
  };

  useEffect(() => {
    loadStorageData()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const refreshToken = async (auth: string) => {
    await setToken(auth);
    const _store = {_token: auth, _refresh: refresh};
    await AsyncStorage.setItem('@Credentials', JSON.stringify(_store));
    return Promise.resolve();
  };

  const signIn = async (data?: {username: string; password: string}): Promise<void> => {
    if (data) {
      const _response = await login(data);
      setToken(_response.access);
      setRefresh(_response.refresh);
      const _store = {_token: _response.access, _refresh: _response.refresh};
      await AsyncStorage.setItem('@Credentials', JSON.stringify(_store));
    } else {
      throw new Error('Verifique as credenciais');
    }
  };

  const signOut = async () => {
    setToken(undefined);
    setRefresh(undefined);
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
