import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/pages/Login';
import Restaurants from './components/pages/Restaurants';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Oswald': require('./assets/fonts/Oswald-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainScreen = () => {
    return(
        <SafeAreaView style={styles.mainContainer}>
            <Header />
            <Restaurants />
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});
