import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';
import {addSeconds, format, set} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';
import {Batida} from '../../entities/batida';

const useInterval = () => {
  const interval = useRef<any>();
  useEffect(
    () => () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    },
    [],
  );
  return interval;
};

const renderEnterIcon = (props: any) => <Icon {...props} name="log-in-outline" />;
const renderExitIcon = (props: any) => <Icon {...props} name="log-out-outline" />;

const Footer: React.FC<{
  batidas?: Batida[];
  disabled?: boolean;
  loading?: boolean;
  registerEvent?(): void;
}> = ({batidas, registerEvent, disabled}) => {
  const [workedTime, setWorkedTime] = useState<Date>(
    set(new Date(), {hours: 0, minutes: 0, seconds: 0}),
  );
  const [working, setWorking] = useState<boolean>(false);
  const interval = useInterval();

  useEffect(() => {
    // console.log('After');
    // console.log(batidas?.length);
    if (batidas && batidas.length > 0 && batidas.length % 2 === 1) {
      setWorking(true);
    } else {
      setWorking(false);
    }
  }, [batidas, batidas?.length]);

  useFocusEffect(
    React.useCallback(() => {
      interval.current = setInterval(() => {
        if (batidas) {
          const workTime = set(new Date(), {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });
          if (batidas.length > 0) {
            const diff: Array<number> = batidas.map(e => e.worktime_clock.getTime() / 1000);
            if (diff.length % 2 === 1) {
              diff.push(new Date().getTime() / 1000);
            }
            const res: number = diff.reduce((a, b) => b - a);
            setWorkedTime(addSeconds(workTime, res));
          } else {
            setWorkedTime(set(new Date(), {hours: 0, minutes: 0, seconds: 0}));
          }
        } else {
          setWorkedTime(set(new Date(), {hours: 0, minutes: 0, seconds: 0}));
        }
      }, 1000);
      return () => {
        clearInterval(interval.current);
        setWorkedTime(set(new Date(), {hours: 0, minutes: 0, seconds: 0}));
      };
    }, [batidas]),
  );

  return (
    <View style={styles.footer}>
      <Text
        style={{
          height: 35,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
        category="h4">
        {format(workedTime, 'HH:mm:ss')}
      </Text>
      <Button
        style={{
          height: 58,
          alignContent: 'center',
          alignSelf: 'stretch',
          alignItems: 'center',
        }}
        onPress={registerEvent}
        disabled={disabled ?? false}
        accessoryLeft={!working ? renderEnterIcon : renderExitIcon}
        status={!working ? 'success' : 'danger'}
        size="giant">
        {!working ? 'Entrada' : 'Saída'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#b9bac5',
  },
});

export {Footer};
