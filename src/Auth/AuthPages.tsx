import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './Login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const AuthPages = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {AuthPages};
