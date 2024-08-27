import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './components/contexts/AuthContext';

import Login from './components/pages/Login';
import Restaurants from './components/pages/Restaurants';
import OrderPage from './components/pages/OrderPage';
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
    <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="OrderPage" component={OrderPageScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
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

const OrderPageScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header />
            <OrderPage />
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
