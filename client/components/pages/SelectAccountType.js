import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserLarge, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const SelectAccountType = () => {
    const { setAccountType } = useAuth();
    const navigation = useNavigation();


const handleSelectAccountType = (type) => {
    setAccountType(type);
    navigation.navigate(type === 'Customer' ? 'MainCustomerScreen' : 'MainCourierScreen');
}

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Account Type</Text>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.customerCard}
                    onPress={() => handleSelectAccountType('Customer')}
                >
                <FontAwesomeIcon 
                    style={styles.customerIcon}
                    icon={faUserLarge}
                />
                <Text style={styles.cardText}>Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.courierCard}
                    onPress={() => handleSelectAccountType('Courier')}
                >
                    <FontAwesomeIcon
                    style={styles.courierIcon}
                    icon={faTaxi}
                    />
                    <Text style={styles.cardText}>Courier</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    icon: {
      marginBottom: 10,
      color: '#333',
    },
    cardText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
    },
});

export default SelectAccountType;