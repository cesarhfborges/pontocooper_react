import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Icon, Layout, Text, TopNavigation} from '@ui-kitten/components';
import {TopBarHome} from '../../components/TopBarHome';
import {addHours, format, set} from 'date-fns';
import {useAxios} from '../../contexts/AxiosContext';
import {useFocusEffect} from '@react-navigation/native';
import {Profile} from '../../entities/profile';
import {Ponto} from '../../entities/ponto';
import { Batida } from "../../entities/batida";

const renderEnterIcon = (props: any) => <Icon {...props} name="log-in-outline" />;
const ButtonsFooter = () => (
  <View style={styles.footer}>
    <Text style={{textAlign: 'center', paddingVertical: 4}} category="h2">
      00:00:00
    </Text>
    <Button style={{borderRadius: 0}} accessoryLeft={renderEnterIcon} status="success" size="large">
      Entrada
    </Button>
  </View>
);

interface Data {
  tipo: string;
  hora: Date;
}

const data: Data[] = new Array(4)
  .fill({
    hora: set(new Date(), {hours: 1, minutes: 0, seconds: 0}),
    tipo: 'entrada',
  })
  .map((a: Data, i) => ({
    hora: addHours(a.hora, i),
    tipo: i % 2 === 0 ? 'entrada' : 'saida',
  }));

const CardHeader = (props: any) => (
  <View {...props} style={[props.style, styles.cardHeader]}>
    <View style={[styles.cardHeaderItems, {maxWidth: 40}]}>
      <Icon style={styles.icon} fill="#36f" name="globe-2-outline" />
    </View>
    <View style={[styles.cardHeaderItems, {flex: 2}]}>
      <Text style={{fontSize: 22}} category="h6">
        Produção de hoje
      </Text>
    </View>
    <View style={styles.cardHeaderItems}>
      <Text
        status="success"
        style={{
          textAlign: 'right',
          fontSize: 16,
        }}
        category="s1">
        Sex. 06 de Janeiro
      </Text>
    </View>
  </View>
);

const HomeScreen: React.FC = () => {
  const {service} = useAxios();
  const [profile, setProfile] = useState<any>({});

  useFocusEffect(useCallback(() => {}, []));

  const ponto: Ponto = new Ponto([]);

  // const getProfile = async () => {
  //   const response = await service.get('/person/current');
  //   console.log(response);
  // };

  // useEffect(() => {
  //   getProfile().catch();
  // }, [getProfile]);

  return (
    <SafeAreaView style={styles.safeView}>
      <TopBarHome />
      <Layout level="3" style={styles.layout}>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Card header={CardHeader} style={styles.card}>
              <Text style={styles.title} category="h6">
                Banco de horas:
              </Text>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Aprovadas:
                  </Text>
                  <Text style={styles.text} category="s1">
                    +35:54h
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Em Analise:
                  </Text>
                  <Text style={styles.text} category="s1">
                    +35:54h
                  </Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Jornada:
                  </Text>
                  <Text style={styles.text} category="s1">
                    8h
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Carga horária:
                  </Text>
                  <Text style={styles.text} category="s1">
                    176h
                  </Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Dias úteis:
                  </Text>
                  <Text style={styles.text} category="s1">
                    22
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Restante:
                  </Text>
                  <Text style={styles.text} category="s1">
                    151h
                  </Text>
                </View>
              </View>
              <Text style={styles.title} category="h6">
                Entradas/Saídas:
              </Text>
              {data.length > 0 ? (
                data.map((item: any, i: number, items) => (
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
                      style={[styles.icon, {width: 34, height: 34}]}
                      fill={item.tipo === 'entrada' ? 'green' : 'red'}
                      name={item.tipo === 'entrada' ? 'log-in-outline' : 'log-out-outline'}
                    />
                    <Text style={{marginLeft: 8, fontSize: 22}} category="s1">
                      {format(item.hora, 'HH:mm:ss')}
                    </Text>
                  </View>
                ))
              ) : (
                <View
                  style={[
                    styles.flexRow,
                    {
                      borderStyle: 'solid',
                      borderColor: '#dde1eb',
                      borderBottomWidth: 0,
                      paddingHorizontal: 0,
                      paddingVertical: 4,
                    },
                  ]}>
                  <Icon
                    style={[styles.icon, {width: 24, height: 24}]}
                    fill="orange"
                    name="info-outline"
                  />
                  <Text style={{marginLeft: 8, fontSize: 16}} status="warning" category="s1">
                    Nenhum ponto registado hoje.
                  </Text>
                </View>
              )}
              <Button
                style={{borderRadius: 0}}
                onPress={() => {
                  const batida: Batida = {
                    id: 0,
                    position: 0,
                    check_in: true,
                    check_in_display: '',
                    latitude: 0,
                    longitude: 0,
                    minimum_break: true,
                    worktime_clock: new Date(),
                  };
                  ponto.addPonto(batida);
                  console.log(ponto.batidas);
                }}
                accessoryLeft={renderEnterIcon}
                status="success"
                size="large">
                Teste de Batida
              </Button>
            </Card>
          </View>
        </ScrollView>
      </Layout>
      <TopNavigation title={ButtonsFooter} alignment="center" style={styles.bottomBar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layout: {
    flex: 1,
    padding: 10,
  },
  scroll: {
    flex: 1,
  },
  bottomBar: {
    flex: 1,
    maxHeight: 115,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.46,
    elevation: 9,
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    padding: 0,
    paddingVertical: 0,
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
  title: {
    marginBottom: 8,
    fontSize: 24,
  },
  label: {
    fontSize: 18,
  },
  text: {
    fontSize: 22,
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    width: 32,
    height: 32,
  },
});

export {HomeScreen};
