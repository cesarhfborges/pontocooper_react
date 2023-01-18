import React, {useEffect, useState} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {AuthPages} from './auth/AuthPages';
import {Pages} from './screens/Pages';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ToastProvider} from 'react-native-toast-notifications';
import {AuthProvider, useAuth} from './contexts/AuthContext';
import {AxiosProvider} from './contexts/AxiosContext';
import {LoadingComponent} from './components/LoadingComponent';

const Router: any = () => {
  const {token} = useAuth();
  return token ? (
    <AxiosProvider>
      <Pages />
    </AxiosProvider>
  ) : (
    <AuthPages />
  );
};

export default () => {
  const {loading} = useAuth();
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(loading);
    }, 3000);
  }, [loading]);

  return (
    <>
      <ToastProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light} mapping={eva.mapping}>
          <AuthProvider>{loadingState ? <LoadingComponent /> : <Router />}</AuthProvider>
        </ApplicationProvider>
      </ToastProvider>
    </>
  );
};
