import React from 'react';
import {Button, Card, Icon, List, ListItem, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {format} from 'date-fns';
import {Production} from '../../entities/production';

const renderItemAccessory = () => <Button size="tiny">FOLLOW</Button>;

const RenderEnterIcon = (props: any) => <Icon {...props} fill="green" name="log-in-outline" />;
const RenderExitIcon = (props: any) => <Icon {...props} fill="red" name="log-out-outline" />;

const renderItem = ({item}: any) => (
  <ListItem
    title={() => <Text category="h6">{format(item.worktime_clock, 'HH:mm')}</Text>}
    focusable={false}
    disabled={true}
    // description={`${item.description} ${index + 1}`}
    accessoryLeft={item.check_in ? RenderEnterIcon : RenderExitIcon}
    // accessoryRight={renderItemAccessory}
  />
);

const CardProducao: React.FC<{item: Production}> = ({item}) => {
  const Header = (props: any) => (
    <View {...props} style={styles.cardTitle}>
      <View style={styles.cardTitleSpaces}>
        <Icon style={styles.icon} fill="#8F9BB3" name="calendar-outline" />
        <Text category="h6">{format(item.date, 'dd/MM/yyyy')}</Text>
      </View>
      <View style={[styles.cardTitleSpaces, {justifyContent: 'flex-end'}]}>
        <Text status="warning" category="h6">
          {item.day_type ? item.day_type.day_type_display : ''}
        </Text>
      </View>
    </View>
  );

  return (
    <Card status="info" style={styles.card} header={Header}>
      {item.timeline.length > 0 ? (
        <>
          <List
            overScrollMode="always"
            style={styles.listaPonto}
            data={item.timeline}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={i => i.id.toString()}
          />
          <Text category="h6">Produção: {format(item.production, 'HH:mm')}</Text>
        </>
      ) : item.day_type ? (
        <>
          <Text style={{textAlign: 'center', paddingVertical: 14}} status="info" category="h5">
            {item.day_type.status_display}
          </Text>
        </>
      ) : (
        <>
          <Text style={{textAlign: 'center', paddingVertical: 14}} category="h6" status="basic">
            Nenhum ponto registrado para este dia.
          </Text>
        </>
      )}
      <View style={styles.spaceBtns}>
        <Button style={[styles.btnsAjustePonto, {marginRight: 8}]} status="success">
          Rasurar
        </Button>
        <Button style={[styles.btnsAjustePonto, {marginLeft: 8}]} status="info">
          H. Extra / Auséncia
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
    // flexDirection: 'row',
    // alignContent: 'stretch',
    // alignSelf: 'stretch',
    paddingLeft: 0,
    paddingStart: 0,
    marginLeft: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    // backgroundColor: 'red',
  },
  spaceBtns: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    // backgroundColor: 'red',
  },
  btnsAjustePonto: {
    flex: 1,
  },
});

export {CardProducao};
