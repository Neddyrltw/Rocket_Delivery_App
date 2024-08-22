import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button}>
                <FontAwesomeIcon icon={faBurger} size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <FontAwesomeIcon icon={faClockRotateLeft} size={30} color="#000" />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        maxHeight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
      },
      button: {
        width: '25%', 
        aspectRatio: 2, 
        backgroundColor: '#d3d3d3', // Grey square
        borderRadius: 50, // Increase borderRadius for a more oval shape
        marginHorizontal: '10%', 
        alignItems: 'center',
        justifyContent: 'center',
      },
  });
  
  export default Footer;
  