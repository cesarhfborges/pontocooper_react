import React from 'react';
import {TopBar} from '../../components/TopBar';
import {Card, Icon, Layout, Text} from '@ui-kitten/components';
import {ScrollView, StyleSheet, View} from 'react-native';

const CardHeader = (props: any) => (
  <View {...props} style={[props.style, styles.cardHeader]}>
    <View style={[styles.cardHeaderItems, {maxWidth: 40}]}>
      <Icon style={styles.icon} fill="#36f" name="person-outline" />
    </View>
    <View style={[styles.cardHeaderItems, {flex: 2}]}>
      <Text style={{fontSize: 22}} category="h6">
        Perfil
      </Text>
    </View>
    {/*<View style={styles.cardHeaderItems}>*/}
    {/*  <Text*/}
    {/*    status="success"*/}
    {/*    style={{*/}
    {/*      textAlign: 'right',*/}
    {/*      fontSize: 16,*/}
    {/*    }}*/}
    {/*    category="s1">*/}
    {/*    Sex. 06 de Janeiro*/}
    {/*  </Text>*/}
    {/*</View>*/}
  </View>
);

class ProfileScreen extends React.Component<any, any> {
  render() {
    return (
      <Layout style={styles.topContainer} level="2">
        <TopBar homeScreen={false} />
        <ScrollView>
          <View style={styles.view}>
            <Card
              header={CardHeader}
              // footer={CardFooter}
              style={styles.card}
            />
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  card: {
    flex: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderItems: {
    justifyContent: 'center',
    flex: 1,
    height: 32,
  },
  icon: {
    flex: 1,
    width: 32,
    height: 32,
  },
});

export {ProfileScreen};
