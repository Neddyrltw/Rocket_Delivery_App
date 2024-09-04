import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger, faClockRotateLeft, faUser } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ navigation }) => {
    return (
        <View style={styles.footer}>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('MainCustomerScreen')}    
                >
                    <FontAwesomeIcon icon={faBurger} size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Restaurants</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('OrderHistory')}
                >
                    <FontAwesomeIcon icon={faClockRotateLeft} size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Order History</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AccountScreen')}
                >
                    <FontAwesomeIcon icon={faUser} size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Account</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
    },
    iconContainer: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
        fontFamily: 'Oswald',
    },
});

export default Footer;