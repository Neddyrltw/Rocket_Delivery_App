import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './components/contexts/AuthContext';
import { useAuth } from './components/contexts/AuthContext';
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
const AppStack = createNativeStackNavigator();

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
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          {/* Authentication flow */}
          <AppStack.Screen name="AuthStack" component={AuthFlow} />
          {/* Main app flow */}
          <AppStack.Screen name="MainStack" component={MainFlow} />
        </AppStack.Navigator>
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
  const { userState } = useAuth(); 
  console.log("User state in MainFlow:", userState);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {userState?.accountType ? (
        <>
          <AppStack.Screen name="MainCustomerScreen" component={MainCustomerScreen} />
          <AppStack.Screen name="OrderPage" component={OrderPageScreen} />
          <AppStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          <AppStack.Screen name="MainCourierScreen" component={MainCourierScreen} />
          <AppStack.Screen name="AccountScreen" component={AccountScreen} />
        </>
      ) : (
        <AppStack.Screen name="SelectAccountType" component={SelectAccountType} />
      )}
    </AppStack.Navigator>
  );
};

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
