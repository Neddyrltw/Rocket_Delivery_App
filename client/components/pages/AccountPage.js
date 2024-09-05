import React, { useState, useEffect } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { useAuth } from '../contexts/AuthContext';
import useUserData from '../contexts/UserContext';

const AccountPage = () => {
    const { user } = useAuth();
    const { userData } = useUserData();

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;

    if (!userData) {
        return <Text>Locating user data...</Text>
    }

    const handleUpdateAccount = () => {

        if (!account_email || !account_phone) {
            return Alert.alert('Failure', 'Please provice a valid account email or phone number.')
        }

        // try {
        //     const 
        // } catch (error) {

        // }
    }

    const { primary_email, account_email, account_phone } = userData;
    const accountType = user?.accountType;

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.pageHeader}>
                    <Text style={styles.headerText}>MY ACCOUNT</Text>
                </View>
                <View style={styles.accountType}>
                    <Text style={styles.headerSubtitle}>Logged in as {accountType}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Primary Email</Text>
                    <TextInput
                        style={[styles.input, styles.readOnlyInput]}
                        value={primary_email}
                        editable={false}
                    />
                    <Text style={styles.subtitle}>Email used to log in to the application.</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{accountType} Email</Text>
                    <TextInput
                        style={styles.input}
                        value={account_email}
                    />
                    <Text style={styles.subtitle}>Email used for your {accountType} account.</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{accountType} Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={account_phone}
                    />
                    <Text style={styles.subtitle}>Phone number used for your {accountType} account.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>UPDATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
    },
    pageHeader: {
        paddingBottom: 15,
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'Oswald',
    },
    headerSubtitle: {
        paddingBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 12,
      color: '#333',
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
    },
    subtitle: {
        fontSize: 10,
        color: '#aaa'
    },
    readOnlyInput: {
      backgroundColor: '#F0F0F0',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#DA583B',
        borderRadius: 5,
    },
    buttonText: {
        padding: 10,
        color: '#fff',

    }
  });
  
  

export default AccountPage;