import React from 'react';
import {
  Button,
  Card,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ScrollView, StyleSheet, View} from 'react-native';
import {addHours, format, set} from 'date-fns';

const CardHeader = (props: any) => (
  <View {...props} style={[props.style, styles.cardHeader]}>
    <View style={[styles.cardHeaderItems, {maxWidth: 40}]}>
      <Icon style={styles.icon} fill="#36f" name="globe-2-outline" />
    </View>
    <View style={[styles.cardHeaderItems, {flex: 3}]}>
      <Text category="h6">Produção de hoje</Text>
    </View>
    <View style={[styles.cardHeaderItems]}>
      <Text
        status="success"
        style={{
          textAlign: 'right',
        }}
        category="s1">
        Sex. 06 de Janeiro
      </Text>
    </View>
  </View>
);

const renderEnterIcon = (props: any) => (
  <Icon {...props} name="log-in-outline" />
);

const ButtonsFooter = (props: any) => (
  <View {...props} style={styles.flex}>
    {/*<Button size="small" status="basic">*/}
    {/*  CANCEL*/}
    {/*</Button>*/}
    <Button accessoryLeft={renderEnterIcon} status="success" size="large">
      Entrada
    </Button>
  </View>
);

interface Data {
  tipo: string;
  hora: Date;
}

const data: Data[] = new Array(23)
  .fill({
    hora: set(new Date(), {hours: 1, minutes: 0, seconds: 0}),
    tipo: 'entrada',
  })
  .map((a: Data, i) => ({
    hora: addHours(a.hora, i),
    tipo: i % 2 === 0 ? 'entrada' : 'saida',
  }));

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

const renderButtonsAction = () => <TopNavigationAction icon={BackIcon} />;

class HomeScreen extends React.Component<any, any> {
  render() {
    return (
      <Layout style={styles.topContainer} level="2">
        <TopNavigation
          alignment="center"
          title="Eva Application"
          subtitle="Subtitle"
          style={styles.topNav}
          accessoryLeft={renderBackAction}
          // accessoryRight={renderRightActions}
        />
        <ScrollView>
          <View style={styles.view}>
            <Card
              header={CardHeader}
              // footer={CardFooter}
              style={styles.card}>
              <Text style={{marginBottom: 8}} category="h6">
                Banco de horas:
              </Text>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text category="label">Aprovadas:</Text>
                  <Text category="s1">+35:54h</Text>
                </View>
                <View style={styles.flex}>
                  <Text category="label">Em Analise:</Text>
                  <Text category="s1">+35:54h</Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text category="label">Jornada:</Text>
                  <Text category="s1">8h</Text>
                </View>
                <View style={styles.flex}>
                  <Text category="label">Carga horária:</Text>
                  <Text category="s1">176h</Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text category="label">Dias úteis:</Text>
                  <Text category="s1">22</Text>
                </View>
                <View style={styles.flex}>
                  <Text category="label">Restante:</Text>
                  <Text category="s1">151h</Text>
                </View>
              </View>
              <Text style={{marginVertical: 8}} category="h6">
                Entradas/Saídas:
              </Text>
              {data.map((item: any, i: number, items) => (
                <View
                  key={i}
                  style={[
                    styles.flexRow,
                    {
                      borderStyle: 'solid',
                      borderColor: '#dde1eb',
                      borderBottomWidth: i + 1 >= items.length ? 0 : 1,
                      paddingHorizontal: 0,
                      paddingVertical: 4,
                    },
                  ]}>
                  <Icon
                    style={[styles.icon, {width: 24, height: 24}]}
                    fill={item.tipo === 'entrada' ? 'green' : 'red'}
                    name={
                      item.tipo === 'entrada'
                        ? 'log-in-outline'
                        : 'log-out-outline'
                    }
                  />
                  <Text style={{marginLeft: 8, fontSize: 16}} category="s1">
                    {format(item.hora, 'HH:mm:ss')}
                  </Text>
                </View>
              ))}
            </Card>
          </View>
        </ScrollView>
        <TopNavigation
          title={ButtonsFooter}
          style={styles.topNav}
          // accessoryRight={renderRightActions}
        />
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
    // flexDirection: 'row',
    // justifyContent: 'center',
    // backgroundColor: 'blue',
    // paddingHorizontal: 8,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  topNav: {
    // flex: 1,
    // flexDirection: 'column',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.46,
    elevation: 9,
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 8,
    paddingTop: 16,
    // backgroundColor: 'red',
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
    // backgroundColor: 'green',
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  cardHeaderItems: {
    // flex: 1,
    // flexBasis: 'auto',
    // flexGrow: 0,
    // flexShrink: 1,
    justifyContent: 'center',
    flex: 1,
    // width: 100,
    height: 32,
    // alignItems: 'stretch',
    // backgroundColor: 'red',
  },
  cardHeaderItemText: {},
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  flex: {
    flex: 1,
    // backgroundColor: 'green',
    // marginLeft: 1,
  },
  icon: {
    flex: 1,
    width: 32,
    height: 32,
  },
  // footerContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  // },
  // footerControl: {
  //   marginLeft: 2,
  // },
});

export {HomeScreen};
