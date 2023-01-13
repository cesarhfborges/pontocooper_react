import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MenuIcon = (props: any) => <Icon {...props} name="menu-outline" />;
const ProfileIcon = (props: any) => <Icon {...props} name="person-outline" />;
const TopBarHome = () => {
  const navigation = useNavigation();

  const goToProfile = () => {
    // @ts-ignore
    navigation.navigate('Profile');
  };
  const renderMenuAction = () => (
    <TopNavigationAction style={styles.menuIcon} icon={MenuIcon} />
  );
  const renderProfileAction = () => (
    <TopNavigationAction onPress={goToProfile} icon={ProfileIcon} />
  );

  return (
    <TopNavigation
      alignment="center"
      title="Coopersystem"
      subtitle="Ponto Eletrônico"
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
});

export {TopBarHome};
