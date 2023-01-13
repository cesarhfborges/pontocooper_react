import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MenuIcon = (props: any) => <Icon {...props} name="arrow-back-outline" />;
const TopBar = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    // @ts-ignore
    navigation.navigate('Home');
  };
  const renderMenuAction = () => (
    <TopNavigationAction
      style={styles.menuIcon}
      onPress={goToHome}
      icon={MenuIcon}
    />
  );

  return (
    <TopNavigation
      alignment="center"
      title="Coopersystem"
      subtitle="Ponto Eletrônico"
      style={styles.topNav}
      accessoryLeft={renderMenuAction}
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

export {TopBar};
