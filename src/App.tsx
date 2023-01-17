import React from 'react';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {AuthPages} from './auth/AuthPages';
import {Pages} from './screens/Pages';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ToastProvider} from 'react-native-toast-notifications';
import {AuthProvider, useAuth} from './contexts/Auth';

const Router: any = () => {
  const {token} = useAuth();
  return token ? <Pages /> : <AuthPages />;
};

export default () => {
  const {loading} = useAuth();
  return (
    <>
      <ToastProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light} mapping={eva.mapping}>
          <AuthProvider>{loading ? <Text>Carregando...</Text> : <Router />}</AuthProvider>
        </ApplicationProvider>
      </ToastProvider>
    </>
  );
};
