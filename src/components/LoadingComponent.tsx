import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';

const LoadingComponent: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1da57a'}}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{color: '#ffffff', fontSize: 18}}>Carregando...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {LoadingComponent};
