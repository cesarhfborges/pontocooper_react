import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';

const Footer: React.FC<any> = (props: any) => {
  const renderEnterIcon = () => <Icon {...props} name="log-in-outline" />;
  return (
    <View {...props} style={styles.footer}>
      <Text
        style={{
          height: 35,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
        category="h4">
        00:00:00
      </Text>
      <Button
        style={{
          height: 58,
          alignContent: 'center',
          alignSelf: 'stretch',
          alignItems: 'center',
        }}
        accessoryLeft={renderEnterIcon}
        status="success"
        size="giant">
        Registrar Entrada
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#b9bac5',
  },
});

export {Footer};
