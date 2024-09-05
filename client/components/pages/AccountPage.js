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
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountPage = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const { user } = useAuth();
    const { userData,loading, error } = useUserData();

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;
    const { primary_email, account_email, account_phone } = userData || {};
    const accountType = user?.accountType.toLowerCase();

    useEffect(() => {
        if (userData) {
            setEmail(userData.account_email);
            setPhone(userData.account_phone);
        }
    }, [userData]);

    const handleUpdateAccount = async () => {

        if (!email || !phone) {
            return Alert.alert('Failure', 'Please provice a valid account email or phone number.')
        }

        try {
            // Fetch ids from storage
            const userString = await AsyncStorage.getItem('userData');
            const { customer_id, courier_id } = JSON.parse(userString);
            const accountId = accountType === 'customer' ? customer_id : courier_id;

            const accountUpdatePayload = {  
                    account_email: email,
                    account_phone: phone,
                    account_type: accountType
            }
            console.log('Payload:', accountUpdatePayload);

            const response = await fetch(`${apiUrl}/api/account/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountUpdatePayload)
        });
        console.log('Response:', await response.text());


        if (!response.ok) {
            Alert.alert('Failure', 'Network response was not ok');
            throw new Error('Network response was not ok');
        }

        Alert.alert('Success', 'Account updated successfully');

        } catch (error) {
            console.error('Error updating account information: ', error);
        }
    };

    if (loading) return <Text>Loading...</Text>
    if (error) return <Text>Error loading data: {error.message}</Text>

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
                        value={email}
                        onChangeText={setEmail}
                        autoCorrect={false}
                    />
                    <Text style={styles.subtitle}>Email used for your {accountType} account.</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{accountType} Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        autoCorrect={false}
                    />
                    <Text style={styles.subtitle}>Phone number used for your {accountType} account.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleUpdateAccount}
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
        fontSize: 18,
        padding: 10,
        color: '#fff',

    }
  });
  
  

export default AccountPage;