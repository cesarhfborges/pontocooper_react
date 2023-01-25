import React, {useEffect, useState} from 'react';
import {Card, Icon, Layout, Text, List, ListItem, Button} from '@ui-kitten/components';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TopBar} from '../../components/TopBar';
import {addDays, format, getMonth, getYear, parse, parseISO, set} from 'date-fns';
import {useAxios} from '../../contexts/AxiosContext';
import {Production} from '../../entities/production';
import {CardProducao} from './CardProducao';

const ProducaoScreen: React.FC<any> = ({navigation}) => {
  const [loading, setLoading] = useState<{production: boolean}>({production: false});
  const [listaPontos, setListaPontos] = useState<Production[]>([]);
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const {service} = useAxios();

  const getProducao: any = async () => {
    setLoading({...loading, production: true});
    const month: number = getMonth(dateNow);
    const year: number = getYear(dateNow);
    const res = await service.get(
      `/my_production_history/?year=${year.toString()}&month=${month.toString()}`,
    );
    setListaPontos(
      res.data.map((item: any) => ({
        ...item,
        date: parse(item.date, 'yyyy-MM-dd', new Date()),
        production: parse(item.production, "yyyy-MM-dd' 'HH:mm:ss", new Date()),
        timeline: item.timeline.map((timeLineItem: any) => ({
          ...timeLineItem,
          worktime_clock: parse(timeLineItem.worktime_clock, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
        })),
      })),
    );
    setLoading({...loading, production: false});
    return Promise.resolve();
    // `${environment.apiUrl}/my_production_history/?year=${year.toString()}&month=${month.toString()}`
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getProducao();
    });
    return unsubscribe;
    // (async () => {
    //   await getProducao();
    // })();

    // return () => {};
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeView}>
      <TopBar />
      <Layout level="3" style={styles.layout}>
        <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
          <View style={styles.container}>
            <Text>Produção</Text>
            {!loading.production ? (
              listaPontos.map((item, index) => <CardProducao item={item} key={index} />)
            ) : (
              <>
                <Card style={styles.card}>
                  <Text style={{textAlign: 'center', paddingVertical: 20}}>Carregando...</Text>
                </Card>
              </>
            )}
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
  card: {
    marginBottom: 10,
  },
  cardTitle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  cardTitleSpaces: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginEnd: 10,
  },
  listaPonto: {
    backgroundColor: 'red',
  },
});

export {ProducaoScreen};
