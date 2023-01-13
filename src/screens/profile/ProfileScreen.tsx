import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Card, Icon, Layout, Text, Input, Button} from '@ui-kitten/components';
import {TopBar} from '../../components/TopBar';

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

class ProfileScreen extends Component {
  render() {
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
                  value="Cesar Henrique Ferreira Borges"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="Matricula:"
                  placeholder="Place your Text"
                  value="1173"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="E-Mail:"
                  placeholder="Place your Text"
                  value="cesar.borges@coopersystemc.com.br"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="Cargo:"
                  placeholder="Place your Text"
                  value="Analista de Sistemas e desenvolvimento III"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="Valor/Hora: R$"
                  placeholder="Place your Text"
                  value="96,71"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="Data de adesão:"
                  placeholder="Place your Text"
                  value="01/02/2021"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="Data de início:"
                  placeholder="Place your Text"
                  value="08/02/2021"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="Verba preposto:"
                  placeholder="Place your Text"
                  value="Não"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Input
                  label="Verba lider:"
                  placeholder="Place your Text"
                  value="Não"
                  style={styles.input}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  // onChangeText={nextValue => setValue(nextValue)}
                />
                <Button style={styles.btnSair} accessoryLeft={LogoutIcon} status="danger">
                  Sair
                </Button>
              </Card>
            </View>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }
}

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
});

export {ProfileScreen};
