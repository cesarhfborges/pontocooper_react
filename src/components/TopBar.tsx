import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back-outline" />;
const ProfileIcon = (props: any) => <Icon {...props} name="person-outline" />;
const TopBar = (props: any) => {
  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;
  const renderProfileAction = () => <TopNavigationAction icon={ProfileIcon} />;

  return (
    <TopNavigation
      alignment="center"
      title="Coopersystem"
      subtitle="Ponto Eletrônico"
      style={styles.topNav}
      accessoryLeft={renderBackAction}
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
  },
});

export {TopBar};
