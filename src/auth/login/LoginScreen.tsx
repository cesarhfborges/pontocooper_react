import React, {useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Card, Input, Button, Text, Icon, CheckBox} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../../contexts/Auth';

const image = require('./../../assets/wallpaper.jpg');
const logo = require('./../../assets/logo-horizontal.png');

const Header = (props: any) => (
  <View style={styles.header} {...props}>
    <Image style={styles.logo} source={logo} />
  </View>
);

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const {signIn, handleClick} = useAuth();
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const refEmail = useRef<any>(null);
  const refPass = useRef<any>(null);
  const setFocusToPassword = () => {
    refPass?.current?.focus();
  };

  const openRecoverPasswd = () => {
    Linking.openURL('https://sso.coopersystem.com.br/').catch(err => {
      console.error("Couldn't load page", err);
    });
  };

  const loginValidationSchema = yup.object().shape({
    username: yup
      .string()
      .min(4, ({min}) => `Nome de usuário precisa ter no minimo ${min} caracteres.`)
      .required('Informe o nome de usuário.'),
    password: yup
      .string()
      .min(8, ({min}) => `A senha precisa ter no minimo ${min} caracteres.`)
      .required('Informe sua senha.'),
  });

  const submitAction = async (values: any) => {
    setLoading(true);
    try {
      await signIn(values);
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Card style={styles.card} header={Header}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{username: 'cesar.borges', password: '@Dj.91344356', remember: true}}
            onSubmit={submitAction}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldValue,
            }) => (
              <>
                <Input
                  label="Usuário:"
                  placeholder="Ex.: pedro.cardoso"
                  keyboardType="email-address"
                  value={values.username}
                  autoFocus={true}
                  returnKeyType={'next'}
                  autoCapitalize="none"
                  disabled={loading}
                  status={touched.username && errors.username ? 'danger' : 'basic'}
                  onBlur={handleBlur('username')}
                  onSubmitEditing={() => setFocusToPassword()}
                  onChangeText={handleChange('username')}
                  textContentType={'emailAddress'}
                  ref={refEmail}
                />
                {touched.username && errors.username && (
                  <Text style={{fontSize: 10, color: 'red'}}>{errors.username}</Text>
                )}
                <Input
                  label="Senha:"
                  placeholder=""
                  keyboardType="default"
                  textContentType={'password'}
                  disabled={loading}
                  secureTextEntry={secureTextEntry}
                  status={touched.password && errors.password ? 'danger' : 'basic'}
                  onBlur={handleBlur('password')}
                  returnKeyType={'done'}
                  returnKeyLabel={'Entrar'}
                  value={values.password}
                  accessoryRight={renderIcon}
                  autoCapitalize="none"
                  ref={refPass}
                  onChangeText={handleChange('password')}
                />
                {touched.password && errors.password && (
                  <Text style={{fontSize: 10, color: 'red'}}>{errors.password}</Text>
                )}
                <CheckBox
                  checked={values.remember}
                  onChange={next => setFieldValue('remember', next)}
                  style={styles.checkBox}>
                  Lembrar login
                </CheckBox>
                <Button
                  onPress={handleSubmit}
                  style={styles.btnSuccess}
                  disabled={!isValid}
                  status="success">
                  Login
                </Button>
                <Button
                  onPress={() => {
                    handleClick();
                    // console.log(status);
                    // console.log(userToken);
                  }}
                  style={styles.btnSuccess}
                  disabled={!isValid}
                  status="success">
                  print
                </Button>
                <Button onPress={openRecoverPasswd} status="warning" appearance="ghost">
                  Esqueci minha senha
                </Button>
              </>
            )}
          </Formik>
        </Card>
      </ImageBackground>
    </View>
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
