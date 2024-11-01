import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger, faClockRotateLeft, faUser, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const Footer = ({ navigation }) => {
const { width } = Dimensions.get('window'); // get screen width
const iconSize = width * 0.05; // icon size as 5% of the screen width

const { userState } = useAuth();
const { accountType } = userState;

  return (
      <View style={styles.footer}>
        {accountType === 'customer' && (
          <>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MainCustomerScreen')}
              >
                <FontAwesomeIcon
                style={styles.icon}
                size={iconSize}
                  icon={faBurger} />
                  <Text style={styles.subtitle}>Restaurants</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('OrderHistory')}
                >
                  <FontAwesomeIcon
                    style={styles.icon}
                    size={iconSize}
                    icon={faClockRotateLeft} />
                  <Text style={styles.subtitle}>Order History</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
    
          {accountType === 'courier' && (
            <>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('MainCourierScreen')}
                >
                  <FontAwesomeIcon
                  style={styles.icon}
                  size={iconSize}
                  icon={faTruck} />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Deliveries</Text>
              </View>
            </>
          )}
    
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('AccountScreen')}
            >
              <FontAwesomeIcon
              style={styles.icon}
              size={iconSize}
              icon={faUser} />
              <Text style={styles.subtitle}>Account</Text>
            </TouchableOpacity>
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
    },
    iconContainer: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        color:'#000',
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