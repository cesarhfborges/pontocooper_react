import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AuthPages} from './Auth/AuthPages';
import {Pages} from './screens/Pages';
// import {default as mapping} from './mapping.json';

export default () => {
  const [auth, setAuth] = useState<boolean>(true);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
        // customMapping={mapping as any}
        mapping={eva.mapping}>
        {auth ? <Pages /> : <AuthPages />}
      </ApplicationProvider>
    </>
  );
};
