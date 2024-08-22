import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HeaderLogo from '../../assets/Images/HeaderLogo.png';

const { height } = Dimensions.get('window');
const HEADER_HEIGHT = height * .10;

const Header = ({ onLogout }) => {

    return (
      <View style={styles.header}>
        <Image source={HeaderLogo} style={styles.logo} />
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#DA583B',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
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
      height: '150%',
      maxWidth: '50%',
      resizeMode: 'contain',
    },
  });

  export default Header;