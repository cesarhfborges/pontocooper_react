import React, {useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Card, Icon, Layout, Text, Input, Button, Modal} from '@ui-kitten/components';
import {Profile} from '../../entities/profile';
import {TopBar} from '../../components/TopBar';
import {useAuth} from '../../contexts/AuthContext';
import {useAxios} from '../../contexts/AxiosContext';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from '../../components/DropDownToast';

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
  </View>
);

const LogoutIcon = (props: any) => <Icon {...props} name="log-out-outline" />;

const ProfileScreen: React.FC = () => {
  const {signOut} = useAuth();
  const {dropDownAlert} = useToast();
  const {service} = useAxios();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [profile, setProfile] = useState<Profile>({} as Profile);

  const logout: any = () => {
    signOut().catch();
    setModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      const getProfile = async () => {
        const response: any = await service.get('/person/current');
        setProfile(new Profile(response.data));
        return Promise.resolve();
      };
      getProfile().catch();
    }, [service]),
  );

  // useEffect(() => {
  //   // const getProfile = async () => {
  //   //   const response: any = await service.get('/person/current');
  //   //   setProfile(response);
  //   //   console.log(response);
  //   //   return Promise.resolve();
  //   // };
  //   // getProfile().catch();
  // }, [
  //   service
  // ]);

  return (
    <SafeAreaView style={styles.safeView}>
      <TopBar />
      <Layout level="3" style={styles.layout}>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Card
              header={CardHeader}
              // footer={CardFooter}
              style={styles.card}>
              {/*<Text>Teste</Text>*/}
              <Input
                label="Nome:"
                placeholder="Place your Text"
                value={profile?.name_display}
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="Matricula:"
                placeholder="Place your Text"
                value={profile?.csys_registration_number?.toString()}
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="E-Mail:"
                placeholder="Place your Text"
                value={profile?.corporate_email}
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="Cargo:"
                placeholder="Place your Text"
                value={profile?.position_display?.position_display}
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="Valor/Hora: R$"
                placeholder="Place your Text"
                value={profile?.hourly_rate_formated}
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="Data de adesão:"
                placeholder="Place your Text"
                value={profile?.affiliation_date_formated}
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="Data de início:"
                placeholder="Place your Text"
                value={profile?.start_date_formated}
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="Verba preposto:"
                placeholder="Place your Text"
                value={
                  profile?.budgets?.find(i => i.budget_kind === 'verba_preposto')?.has
                    ? 'Sim'
                    : 'Não'
                }
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Input
                label="Verba lider:"
                placeholder="Place your Text"
                value={
                  profile?.budgets?.find(i => i.budget_kind === 'verba_lider')?.has ? 'Sim' : 'Não'
                }
                style={styles.input}
                disabled={true}
                status="disabledAlt"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
              />
              <Button
                // onPress={signOut}
                onPress={() => setModalVisible(true)}
                style={styles.btnSair}
                accessoryLeft={LogoutIcon}
                status="danger">
                Sair
              </Button>
            </Card>
          </View>
          <Modal
            visible={modalVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setModalVisible(false)}>
            <Card
              header={(props: any) => {
                return (
                  <View {...props}>
                    <Text category="h6">Deseja realmente efetuar logout ?</Text>
                  </View>
                );
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minWidth: 270,
                }}>
                <Button
                  // style={{marginHorizontal: 2}}
                  onPress={() => setModalVisible(false)}
                  size="medium"
                  status="basic">
                  Cancelar
                </Button>
                <Button
                  // style={{marginHorizontal: 2}}
                  onPress={() => {
                    logout();
                  }}
                  status="danger"
                  size="medium">
                  Sim, desejo sair.
                </Button>
              </View>
              {/*<Text category="h6">Deseja realmente efetuar logout ?</Text>*/}
              {/*<Button onPress={() => setModalVisible(false)}>DISMISS</Button>*/}
            </Card>
          </Modal>
        </ScrollView>
      </Layout>
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
  input: {
    marginBottom: 8,
  },
  btnSair: {
    marginTop: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export {ProfileScreen};
