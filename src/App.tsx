import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {AuthPages} from './auth/AuthPages';
import {Pages} from './screens/Pages';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ToastProvider} from 'react-native-toast-notifications';

export default () => {
  return (
    <>
      <ToastProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light} mapping={eva.mapping}>
          {true ? <Pages /> : <AuthPages />}
        </ApplicationProvider>
      </ToastProvider>
    </>
  );
};
