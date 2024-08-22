import React, { useState } from 'react';
import Constants from 'expo-constants'
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MyAppHeaderText from '../ui/MyAppHeaderText';
import logo from '../../assets/logo.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const apiUrl = Constants.expoConfig?.extra?.apiUrl;


  const handleLoginPress = () => {
    if (!email || !password) {
      showError('Please enter valid email and password.')
      return;
    }

  fetch(`${apiUrl}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  .then(response => response.json())
  .then(data => {
    if (data.success) {
      Alert.alert('Success', 'Logged in successfully!');
      setErrorMessage('');
    } else {
      showError('Invalid email or password.')
    }
  })
  .catch (error => {
    console.error('Error during login: ', error)
    showError('Something went wrong. Please try again.')
  });
};

const showError = (message) => {
  setErrorMessage(message);
  setTimeout(() => {
    setErrorMessage('');
  }, 1000);
};
  
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.loginContainer}>
          <View style={styles.textWrapper}>
            <MyAppHeaderText style={styles.leftAlignedText}>Welcome Back!</MyAppHeaderText>
            <Text style={[styles.subtitle, styles.leftAlignedText]}>Login to begin</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder='Enter your primary email here'
              autoCorrect={false}
              keyboardType='email-address'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder='●●●●●●●●'
              secureTextEntry
            />
          </View>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#DA583B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapper: {
    flex: 1,
    width: '90%',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  loginContainer: {
    width: '100%',
    maxWidth: 500,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15, 
  },
  input: {
    height: 40,
    width: '100%',
    maxWidth: 500,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  leftAlignedText: {
    textAlign: 'left',
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  textWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: -10,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#333',
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
});

export default Login;
