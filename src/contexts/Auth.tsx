import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../services/authService';

type AuthContextData = {
  token?: string;
  isLogged: boolean;
  loading: boolean;
  signIn(data: {username: string; password: string}): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<any> = ({children}: any) => {
  const [token, setToken] = useState<any>();
  const [isLogged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const _token = await AsyncStorage.getItem('@Token');
        if (_token) {
          setToken(_token);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadStorageData().catch();
  }, []);

  const signIn = async (data?: {username: string; password: string}): Promise<void> => {
    if (data) {
      const _response = await login(data);
      setToken(_response.access);
      await AsyncStorage.setItem('@Token', _response.access);
    } else {
      throw new Error('Verifique as credenciais');
    }
  };

  const signOut = async () => {
    setToken(undefined);
    await AsyncStorage.removeItem('@Token');
  };

  return (
    <AuthContext.Provider value={{token, isLogged, loading, signIn, signOut}}>
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
