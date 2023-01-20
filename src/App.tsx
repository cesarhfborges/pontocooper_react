import React, {useEffect, useState} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {AuthPages} from './auth/AuthPages';
import {Pages} from './screens/Pages';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AuthProvider, useAuth} from './contexts/AuthContext';
import {AxiosProvider} from './contexts/AxiosContext';
import {LoadingComponent} from './components/LoadingComponent';
import {DropDownToast} from './components/DropDownToast';

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
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} mapping={eva.mapping}>
        <DropDownToast>
          <AuthProvider>{loadingState ? <LoadingComponent /> : <Router />}</AuthProvider>
        </DropDownToast>
      </ApplicationProvider>
    </>
  );
};
