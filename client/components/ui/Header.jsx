import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

import HeaderLogo from '../../assets/Images/HeaderLogo.png';

const { height } = Dimensions.get('window');
const HEADER_HEIGHT = height * .10;

const Header = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  }

  return (
    <View style={styles.header}>
    <Image source={HeaderLogo} style={styles.logo} />
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>LOG OUT</Text>
    </TouchableOpacity>
  </View>
  );
};

  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#DA583B',
      padding: 5,
      borderRadius: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Oswald',
      marginHorizontal: 10, 
      marginVertical: 5
    },
    header: {
      width: '100%',
      height: HEADER_HEIGHT,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingTop: 10,
      paddingVertical: 10,
      backgroundColor: '#FFFFFF',
      borderBottomColor: '#FFFFFF ',
      elevation: 1, // Android shadow
      shadowColor: '#000', // iOS shadow color
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3, // Increase if needed
      shadowRadius: 1.5, // Increase if needed
      zIndex: 1,
    },
    logo: {
      height: '90%',
      maxWidth: '40%',
      resizeMode: 'contain',
    },
  });

  export default Header;