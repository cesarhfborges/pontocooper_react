import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from './home/HomeScreen';
import {ProfileScreen} from './profile/ProfileScreen';

const Drawer = createDrawerNavigator();

const Pages = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#1da57a"
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export {Pages};
