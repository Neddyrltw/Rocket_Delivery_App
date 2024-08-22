import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.button}>
                    <FontAwesomeIcon icon={faBurger} size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Restaurants</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.button}>
                    <FontAwesomeIcon icon={faClockRotateLeft} size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Order History</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    iconContainer: {
        alignItems: 'center', 
    },
    button: {
        width: '25%',
        aspectRatio: 2,
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
  