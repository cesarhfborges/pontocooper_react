import React from 'react';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {AuthPages} from './auth/AuthPages';
import {Pages} from './screens/Pages';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ToastProvider} from 'react-native-toast-notifications';
import {AuthProvider, useAuth} from './contexts/Auth';
import {SafeAreaView, View} from 'react-native';

const Router: any = () => {
  const {isLogged} = useAuth();
  return isLogged() ? <Pages /> : <AuthPages />;
};

const Loading: any = () => (
  <SafeAreaView>
    <View>
      <Text>Carregando...</Text>
    </View>
  </SafeAreaView>
);

export default () => {
  const {loading, token} = useAuth();
  return (
    <>
      <ToastProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light} mapping={eva.mapping}>
          <AuthProvider>{loading ? <Loading /> : <Router />}</AuthProvider>
        </ApplicationProvider>
      </ToastProvider>
    </>
  );
};
