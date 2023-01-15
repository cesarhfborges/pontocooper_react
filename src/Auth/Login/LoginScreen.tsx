import React, {useRef} from 'react';
import {Card, Input, CheckBox, Button} from '@ui-kitten/components';
import {Image, ImageBackground, StyleSheet, View, Linking} from 'react-native';
import {signIn, login} from '../../services/auth';

const image = require('./../../assets/wallpaper.jpg');
const logo = require('./../../assets/logo-horizontal.png');

const Header = (props: any) => (
  <View style={styles.header} {...props}>
    <Image style={styles.logo} source={logo} />
  </View>
);

const LoginScreen = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [check, setCheck] = React.useState<boolean>(false);

  const refEmail = useRef<any>(null);
  const refPass = useRef<any>(null);

  const setFocusToPassword = () => {
    refPass?.current?.focus();
  };

  const handleSign = async () => {
    console.log('pressed');
    const req: any = {username: 'cesar.borges', password: '@Dj.91344356'};
    const response = await login(req);
    console.log(response.data);
    console.log('Success');
  };

  const openRecoverPasswd = () => {
    Linking.openURL('https://sso.coopersystem.com.br/').catch(err => {
      console.error("Couldn't load page", err);
      // alert('Failed to open page');
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Card style={styles.card} header={Header}>
          <Input
            label="E-Mail:"
            placeholder="Ex.: pedro@coopersystem.com.br"
            keyboardType="email-address"
            value={email}
            autoFocus={true}
            returnKeyType={'next'}
            onSubmitEditing={() => setFocusToPassword()}
            onChangeText={nextValue => setEmail(nextValue)}
            textContentType={'emailAddress'}
            ref={refEmail}
          />
          <Input
            label="Senha:"
            placeholder=""
            keyboardType="default"
            textContentType={'password'}
            secureTextEntry={true}
            returnKeyType={'done'}
            returnKeyLabel={'Entrar'}
            value={password}
            ref={refPass}
            onChangeText={nextValue => setPassword(nextValue)}
          />
          <CheckBox
            checked={check}
            onChange={next => setCheck(next)}
            style={styles.checkBox}>
            Lembrar login
          </CheckBox>
          <Button
            onPress={handleSign}
            style={styles.btnSuccess}
            status="success">
            Login
          </Button>
          <Button
            onPress={openRecoverPasswd}
            status="warning"
            appearance="ghost">
            Esqueci minha senha
          </Button>
        </Card>
      </ImageBackground>
    </View>
    // <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>Teste</Text>
    // </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  card: {
    // flex: 3,
    maxWidth: 450,
  },
  header: {
    backgroundColor: 'blue',
  },
  logo: {
    // width: 66,
    // height: 58,
    maxWidth: '100%',
    height: 44,
    // backgroundColor: 'red',
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  checkBox: {
    paddingVertical: 16,
  },
  btnSuccess: {
    marginBottom: 24,
  },
  layout: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export {LoginScreen};
