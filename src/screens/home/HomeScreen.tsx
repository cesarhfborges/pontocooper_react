import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Icon, Layout, Spinner, Text} from '@ui-kitten/components';
import {TopBarHome} from '../../components/TopBarHome';
import {format, parseISO} from 'date-fns';
import {useAxios} from '../../contexts/AxiosContext';
import {ListaBatidas} from './ListaBatidas';
import {Footer} from './Footer';
import {Ponto} from '../../entities/ponto';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../services/gpsService';

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
    <View style={[styles.cardHeaderItems, {flex: 2, maxWidth: 90}]}>
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
  const [location, setLocation] = useState<GeoPosition | undefined>(undefined);
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
    const parse = {
      had_minimum_break: response.data.had_minimum_break,
      worked: response.data.worked,
      working: response.data.working,
      timeline: response.data.timeline.map((i: any) => ({
        ...i,
        worktime_clock: parseISO(i.worktime_clock),
      })),
    };
    setDailyWorktimeClock(parse);
    setLoading({...loading, dailyWorktimeClock: false});
    return Promise.resolve();
  };

  const getLocation = async () => {
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setLocation(undefined);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    console.log(location);
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
                    {!loading.compensatoryTime ? `${compensatoryTime?.balance ?? 0}h` : '...'}
                    {/*+35:54h*/}
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Em Analise:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {!loading.compensatoryTime ? `${compensatoryTime?.pending ?? 0}h` : '...'}
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
                    {!loading.summary ? `${summary?.working_hours ?? 0}h` : '...'}
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Carga horária:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {!loading.summary ? `${summary?.hours_to_work ?? 0}h` : '...'}
                  </Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Dias úteis:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {!loading.summary ? `${summary?.business_days ?? 0}h` : '...'}
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.label} category="label">
                    Restante:
                  </Text>
                  <Text style={styles.text} category="s1">
                    {!loading.summary ? `${summary?.remaining_hours ?? 0}h` : '...'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.title, {marginTop: 14}]} category="h6">
                Entradas/Saídas:
              </Text>
              {!loading.dailyWorktimeClock ? (
                <ListaBatidas timeLine={dailyWorktimeClock?.timeline ?? []} />
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
                  <Spinner status="info" />
                  <Text style={{marginLeft: 8, fontSize: 16}} status="info" category="s1">
                    Carregando...
                  </Text>
                </View>
              )}
              <Button onPress={getLocation} status="success" size="giant">
                get GPS
              </Button>
            </Card>
          </View>
        </ScrollView>
      </Layout>
      <Footer style={styles.bottomBar} />
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
    marginBottom: 110,
  },
  scroll: {
    flex: 1,
  },
  bottomBar: {
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.55,
    // shadowRadius: 5.46,
    // elevation: 9,
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
