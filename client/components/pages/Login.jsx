import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
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
import { useAuth } from '../contexts/AuthContext'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  const { login, userState, setAccountType } = useAuth(); 

  // User presss 'login', validation occurs
  const handleLoginPress = async () => {
    if (!email || !password) {
      showError('Please enter a valid email and password.');
      return;
    }

    try {
      const user = await login(email, password);
      console.log('User: ', user);
      if (user.customer_id && !user.courier_id) {
        setAccountType('customer');
      } else if (user.courier_id && !user.customer_id) {
        setAccountType('courier');
      } else if (user.customer_id && user.courier_id) {
        setAccountType(''); 
        navigation.navigate('MainStack', { screen: 'SelectAccountType' });
      } else {
        showError('No valid account type found');
      }
    } catch (error) {
      showError('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (userState && userState.customer_id || userState.courier_id) {
      const { accountType, customer_id, courier_id } = userState;
      if (accountType === 'customer' && customer_id) {
        navigation.navigate('MainStack', { screen: 'MainCustomerScreen' });
      } else if (accountType === 'courier' && courier_id) {
        navigation.navigate('MainStack', { screen: 'MainCourierScreen' });
      } else if (accountType === '') {
        navigation.navigate('MainStack', { screen: 'SelectAccountType' });
      }
    }
  }, [userState]);

  useFocusEffect(
    React.useCallback(() => {
      // Clear inputs when navigating to the login screen
      setEmail('');
      setPassword('');
    }, [])
  );
  
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
