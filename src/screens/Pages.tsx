import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from './home/HomeScreen';
import {ProfileScreen} from './profile/ProfileScreen';
import {Icon} from '@ui-kitten/components';

const Drawer = createDrawerNavigator();

interface IconParams {
  name: string;
  focused: boolean;
  size?: any;
}

const Pages = () => {
  const DrawerIcon: React.FC<IconParams> = ({name, focused, size}: any) => {
    return <Icon style={styles.icon} fill={focused ? '#0095ff' : '#8F9BB3'} name={name} />;
  };

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
        <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
          <Drawer.Screen
            options={{
              drawerLabel: 'Home',
              drawerIcon: ({focused, size}) => <DrawerIcon name="home-outline" focused={focused} />,
            }}
            name="Home"
            component={HomeScreen}
          />
          <Drawer.Screen
            options={{
              drawerLabel: 'Perfil',
              drawerIcon: ({focused, size}) => (
                <DrawerIcon name="person-outline" focused={focused} />
              ),
            }}
            name="Profile"
            component={ProfileScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
});

export {Pages};
