import React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Image></Image>
        <Text>Rocket Delivery</Text>
        <Text>Welcome back!</Text>
        <Text>Login to begin</Text>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
 
})
export default App;