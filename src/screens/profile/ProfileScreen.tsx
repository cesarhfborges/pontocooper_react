import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {TopBar} from '../../components/TopBar';

class ProfileScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <TopBar />
        <Layout level="3" style={styles.layout}>
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <Text>Exemplo</Text>
            </View>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  layout: {
    flex: 1,
    padding: 10,
  },
  scroll: {
    flex: 1,
    // backgroundColor: 'green',
  },
});

export {ProfileScreen};
