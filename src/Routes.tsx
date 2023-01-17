import React, {useContext} from 'react';
import * as eva from '@eva-design/eva';
import {Pages} from './screens/Pages';
import {AuthPages} from './auth/AuthPages';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import AuthContext from './contexts/auth';

export const Routes = () => {
  const signed = useContext(AuthContext);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} mapping={eva.mapping}>
        {signed ? <Pages /> : <AuthPages />}
      </ApplicationProvider>
    </>
  );
};
