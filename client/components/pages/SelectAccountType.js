import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserLarge, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import logo from '../../assets/logo.png';

// Get the screen width for dynamic sizing
const screenWidth = Dimensions.get('window').width;

const SelectAccountType = () => {
    const { setAccountType } = useAuth();
    const navigation = useNavigation();


const handleSelectAccountType = (type) => {
    setAccountType(type);
    navigation.navigate(type === 'Customer' ? 'MainCustomerScreen' : 'MainCourierScreen');
}

// Calculate icon size dynamically
const iconSize = screenWidth * 0.25; // 25% of the screen width

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Select Account Type</Text>
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleSelectAccountType('Customer')}
                    >
                    <FontAwesomeIcon 
                        style={styles.customerIcon}
                        icon={faUserLarge}
                        size={iconSize}
                        color={'#DA583B'}
                    />
                    <Text style={styles.cardText}>Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleSelectAccountType('Courier')}
                    >
                        <FontAwesomeIcon
                        style={styles.courierIcon}
                        icon={faTaxi}
                        size={iconSize}
                        />
                        <Text style={styles.cardText}>Courier</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        resizeMode: 'contain',
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Oswald',
      textAlign: 'center',
      marginBottom: 10,
      color: '#333',
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      paddingVertical: '5%',
      paddingHorizontal: '5%',
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '80%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: .25,
      borderColor: '#ddd'
    },
    cardText: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: '500',
    },
});

export default SelectAccountType;