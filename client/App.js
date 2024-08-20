import React, { useState } from 'react';
import { View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity } from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Image></Image>
        <Text style={styles.welcome}>Welcome back!</Text>
        <Text>Login to begin</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Enter your primary email here'
          autoCorrect={false}
          keyboardType='email-address'
        />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='●●●●●●●●'
        />
      </View>
   
        
      
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  input: {
    height: 40,
    width: '60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  toggleButton: {
    marginLeft: -50,
    padding: 10
  },
  welcome: {
    fontWeight: 'bold'
  }
})
export default App;