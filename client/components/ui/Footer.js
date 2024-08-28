import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ navigation }) => {
    return (
        <View style={styles.footer}>
            <View style={styles.leftContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Main')}    
                >
                    <FontAwesomeIcon icon={faBurger} size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Restaurants</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('OrderHistory')}
                >
                    <FontAwesomeIcon icon={faClockRotateLeft} size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Order History</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensure containers are on opposite sides
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    leftContainer: {
        flexDirection: 'column', // Align icon and text vertically
        alignItems: 'center',
        marginLeft: 75, // Adjust this to move the left container as needed
    },
    rightContainer: {
        flexDirection: 'column', // Align icon and text vertically
        alignItems: 'center',
        marginRight: 75, // Adjust this to move the right container as needed
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
