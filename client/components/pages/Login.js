import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet 
} from 'react-native';

import MyAppHeaderText from '../ui/MyAppHeaderText';
import logo from '../../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    console.log('Login button pressed');
  }
  
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
    alignItems: 'flex-start', // Align items to the start of the container
    marginBottom: 15, // Space between input fields
  },
  input: {
    height: 40,
    width: '100%',
    maxWidth: 500,
    marginVertical: 10, // Adjusted spacing between input and label
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
});

export default Login;
