import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {StyleSheet, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LogoWhite = () => (
  <View style={styles.logoContainer}>
    <Image style={styles.logoImg} source={require('./../assets/logo-horizontal-white.png')} />
  </View>
);
const MenuIcon = (props: any) => <Icon {...props} fill="#FFFFFF" name="menu-outline" />;
const ProfileIcon = (props: any) => <Icon {...props} fill="#FFFFFF" name="person-outline" />;
const TopBarHome = () => {
  const navigation: any = useNavigation();

  const goToProfile = () => {
    // @ts-ignore
    navigation.navigate('Profile');
  };
  const renderMenuAction = () => (
    <TopNavigationAction
      onPress={() => {
        navigation?.openDrawer();
      }}
      style={styles.menuIcon}
      icon={MenuIcon}
    />
  );
  const renderProfileAction = () => (
    <TopNavigationAction onPress={goToProfile} icon={ProfileIcon} />
  );

  return (
    <TopNavigation
      alignment="center"
      title={LogoWhite}
      appearance="topMenu"
      style={styles.topNav}
      accessoryLeft={renderMenuAction}
      accessoryRight={renderProfileAction}
    />
  );
};

const styles = StyleSheet.create({
  topNav: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.46,
    elevation: 9,
    flex: 1,
    maxHeight: 56,
    // backgroundColor: '#0c6329',
  },
  menuIcon: {
    // height: 20,
    // backgroundColor: 'blue',
    // flex: 1,
  },
  logoContainer: {
    // backgroundColor: 'red',
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'center',
    paddingHorizontal: 8,
  },
  logoImg: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export {TopBarHome};
