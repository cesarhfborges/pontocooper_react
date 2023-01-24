import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TopBar} from '../../components/TopBar';

const ProducaoScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <TopBar />
      <Layout level="3" style={styles.layout}>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Text>Test</Text>
          </View>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
  },
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export {ProducaoScreen};
