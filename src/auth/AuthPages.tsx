import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const AuthPages = () => {
  return (
    <>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="#000000"
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {AuthPages};
