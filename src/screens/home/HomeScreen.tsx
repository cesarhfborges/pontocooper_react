import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Icon, Layout, Text, TopNavigation} from '@ui-kitten/components';
import {TopBarHome} from '../../components/TopBarHome';
import {addHours, format, getMonth, getYear, set} from 'date-fns';
import {useAxios} from '../../contexts/AxiosContext';
import {useFocusEffect} from '@react-navigation/native';
import {Profile} from '../../entities/profile';
import {Ponto} from '../../entities/ponto';
import {Batida} from '../../entities/batida';

const renderEnterIcon = (props: any) => <Icon {...props} name="log-in-outline" />;
const ButtonsFooter = (props: any) => (
  <View {...props} style={styles.footer}>
    <Text style={{textAlign: 'center', paddingVertical: 4}} category="h2">
      00:00:00
    </Text>
    <Button style={{borderRadius: 0}} accessoryLeft={renderEnterIcon} status="success" size="large">
      Entrada
    </Button>
  </View>
);

// interface Data {
//   tipo: string;
//   hora: Date;
// }
//
// const data: Data[] = new Array(4)
//   .fill({
//     hora: set(new Date(), {hours: 1, minutes: 0, seconds: 0}),
//     tipo: 'entrada',
//   })
//   .map((a: Data, i) => ({
//     hora: addHours(a.hora, i),
//     tipo: i % 2 === 0 ? 'entrada' : 'saida',
//   }));

const CardHeader = (props: any) => (
  <View {...props} style={[props.style, styles.cardHeader]}>
    <View style={[styles.cardHeaderItems, {maxWidth: 40}]}>
      <Icon style={styles.icon} fill="#36f" name="globe-2-outline" />
    </View>
    <View style={[styles.cardHeaderItems, {flex: 2}]}>
      <Text style={{fontSize: 18}} category="h6">
        Produção de hoje
      </Text>
    </View>
    <View style={[styles.cardHeaderItems, {flex: 2, maxWidth: 90, backgroundColor: 'red'}]}>
      <Text
        status="success"
        style={{
          textAlign: 'right',
          fontSize: 16,
          fontWeight: 'bold',
        }}
        category="s1">
        06/01/22
      </Text>
    </View>
  </View>
);

const HomeScreen: React.FC = () => {
  const {service} = useAxios();
  const [loading, setLoading] = useState<{
    compensatoryTime: boolean;
    summary: boolean;
    profile: boolean;
    dailyWorktimeClock: boolean;
  }>({
    summary: false,
    profile: false,
    compensatoryTime: false,
    dailyWorktimeClock: false,
  });
  const [profile, setProfile] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [compensatoryTime, setCompensatoryTime] = useState<any>(null);
  const [dailyWorktimeClock, setDailyWorktimeClock] = useState<any>(null);

  const ponto: Ponto = new Ponto([]);

  const getProfile = async (): Promise<void> => {
    setLoading({...loading, profile: true});
    const response = await service.get('/person/current');
    setProfile(response.data);
    setLoading({...loading, profile: false});
    return Promise.resolve();
  };

  const getSummary = async (): Promise<void> => {
    const date = new Date();
    const year: string = format(date, 'yyyy');
    const month: string = format(date, 'MM');
    setLoading({...loading, summary: true});
    const response = await service.get(`/work_month_summary/${year}/${month}/`);
    setSummary(response.data);
    setLoading({...loading, summary: false});
    return Promise.resolve();
  };
  const getCompensatoryTime = async (): Promise<void> => {
    setLoading({...loading, compensatoryTime: true});
    const response = await service.get('/my_compensatory_time');
    setCompensatoryTime(response.data);
    setLoading({...loading, compensatoryTime: false});
    return Promise.resolve();
  };
  const getDailyWorktimeClock = async (): Promise<void> => {
    setLoading({...loading, dailyWorktimeClock: true});
    const response = await service.get('/daily_worktime_clock/');
    setDailyWorktimeClock(response.data);
    setLoading({...loading, dailyWorktimeClock: false});
    return Promise.resolve();
  };

  useEffect(() => {
    getProfile().catch();
    getSummary().catch();
    getCompensatoryTime().catch();
    getDailyWorktimeClock().catch();
  }, []);

  // useFocusEffect(() => {
  //   Promise.all([getProfile, getSummary]).catch(e => {
  //     console.info(e);
  //   });
  // });

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
                    {`${compensatoryTime?.balance ?? 0}h`}
                    {/*+35:54h*/}
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Em Analise:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {`${compensatoryTime?.pending ?? 0}h`}
                    {/*+35:54h*/}
                  </Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Jornada:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {`${summary?.working_hours ?? 0}h`}
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Carga horária:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {`${summary?.hours_to_work ?? 0}h`}
                  </Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Dias úteis:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {`${summary?.business_days ?? 0}h`}
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Restante:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {`${summary?.remaining_hours ?? 0}h`}
                  </Text>
                </View>
              </View>
              <Text style={styles.title} category="h6">
                Entradas/Saídas:
              </Text>
              {dailyWorktimeClock?.timeline?.length > 0 ? (
                dailyWorktimeClock?.timeline
                  ?.sort((a: any, b: any) => {
                    return a.id > b.id ? 1 : -1;
                  })
                  .map((item: any, i: number, items: any) => (
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
                        fill={item.check_in ? 'green' : 'red'}
                        name={item.check_in ? 'log-in-outline' : 'log-out-outline'}
                      />
                      <Text style={{marginLeft: 8, fontSize: 22}} category="s1">
                        {/*{format(item.hora, 'HH:mm:ss')}*/}
                        {item.worktime_clock}
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
