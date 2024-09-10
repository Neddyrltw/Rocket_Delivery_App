import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import Constants from 'expo-constants';
import MyAppHeaderText from '../ui/MyAppHeaderText';
import logo from '../../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;
  const { login, setAccountType } = useAuth();  // Access login from AuthContext

  const handleLoginPress = async () => {
    
    if (!email || !password) {
      showError('Please enter valid email and password.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const user = {
          user_id: data.user_id,
          customer_id: data.customer_id,
          courier_id: data.courier_id,
        };

        await login(user);  // Use login from AuthContext
        Alert.alert('Success', 'Logged in successfully!');
        setErrorMessage('');
        
        console.log('customer_id:', data.customer_id);
        console.log('courier_id:', data.courier_id);

        // Navigate based on user role
        if (data.customer_id && !data.courier_id) {
           await setAccountType('customer');
          navigation.navigate('MainStack', { screen: 'MainCustomerPage' });
        } else if (data.courier_id && !data.customer_id) {
          await setAccountType('courier');
          navigation.navigate('MainStack', { screen: 'MainCourierScreen'});
        } else if (data.customer_id && data.courier_id) {
          navigation.navigate('MainStack', {screen: 'SelectAccountType'});
        } else {
          showError('No valid accounty type found');
        }
      } else {
        showError('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login: ', error);
      showError('Something went wrong. Please try again.');
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
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
              placeholder='Enter your password here'
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
    width: '100%',
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
    fontFamily: 'Oswald',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
});

export default Login;