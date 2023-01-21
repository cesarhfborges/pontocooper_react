import React from 'react';
import {Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {format} from 'date-fns';

interface Batida {
  id: number;
  check_in_display: string;
  check_in: boolean;
  position: number;
  worktime_clock: Date;
  rectification: any;
  latitude: number;
  longitude: number;
  minimum_break: boolean;
}

const Batida: React.FC<{item: Batida; last: boolean}> = ({item, last}) => {
  return (
    <View
      style={[
        styles.flexRow,
        {
          borderStyle: 'solid',
          borderColor: '#dde1eb',
          borderBottomWidth: last ? 0 : 1,
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
        {format(item.worktime_clock, 'HH:mm:ss')}
        {/*{item.worktime_clock}*/}
      </Text>
    </View>
  );
};

const ListaBatidas: React.FC<{timeLine: Batida[]}> = ({timeLine}) => {
  return timeLine?.length > 0 ? (
    timeLine
      .sort((a: any, b: any) => {
        return a.id > b.id ? 1 : -1;
      })
      .map((item, index, items) => (
        <Batida key={index} item={item} last={index + 1 >= items.length} />
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
      <Icon style={[styles.icon, {width: 24, height: 24}]} fill="orange" name="info-outline" />
      <Text style={{marginLeft: 8, fontSize: 16}} status="warning" category="s1">
        Nenhum ponto registado hoje.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export {ListaBatidas};