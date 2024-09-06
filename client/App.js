import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './components/contexts/AuthContext';

import Login from './components/pages/Login';
import Restaurants from './components/pages/Restaurants';
import OrderPage from './components/pages/OrderPage';
import OrderHistory from './components/pages/OrderHistory';
import CourierPage from './components/pages/CourierPage';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import SelectAccountType from './components/pages/SelectAccountType';
import AccountPage from './components/pages/AccountPage';

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

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
        {/* Root Navigator */}
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {/* Authentication flow */}
          <MainStack.Screen name="AuthStack" component={AuthFlow} />
          {/* Main app flow */}
          <MainStack.Screen name="MainStack" component={MainFlow} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// Authentication Flow Stack
const AuthFlow = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

// Main App Flow Stack
const MainFlow = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="SelectAccountType" component={SelectAccountType} />
      <MainStack.Screen name="MainCustomerScreen" component={MainCustomerScreen} />
      <MainStack.Screen name="OrderPage" component={OrderPageScreen} />
      <MainStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <MainStack.Screen name="MainCourierScreen" component={MainCourierScreen} />
      <MainStack.Screen name="AccountScreen" component={AccountScreen} />
    </MainStack.Navigator>
  );
};

// Look into conditional rendering for header/footer
const MainCustomerScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.mainContainer}>
            <Header />
            <Restaurants />
            <Footer navigation={navigation}/>
        </SafeAreaView>
    );
}

const OrderPageScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header />
            <OrderPage route={route} />
            <Footer navigation={navigation}/>
        </SafeAreaView>
    );
}

const OrderHistoryScreen = ( {navigation }) => {
  return (
      <SafeAreaView style={styles.mainContainer}>
          <Header />
          <OrderHistory />
          <Footer navigation={navigation}/>
      </SafeAreaView>
  );
}

const MainCourierScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <CourierPage />
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
}

const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <AccountPage />
      <Footer navigation={navigation} />
    </SafeAreaView>
  )
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
