import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import useUserData from '../contexts/UserContext';

const AccountPage = () => {
    const { user } = useAuth();
    const { userData } = useUserData();

    if (!userData) {
        return <Text>Locating user data...</Text>
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
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{accountType} Email</Text>
                    <TextInput
                        style={styles.input}
                        value={account_email}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{accountType} Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={account_phone}
                    />
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      margin: 30,
    },
    pageHeader: {
        paddingBottom: 15,
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'Oswald',
        fontWeight: 'bold'

    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: '#333',
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: '#CCC',
      borderWidth: 1,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    readOnlyInput: {
      backgroundColor: '#F0F0F0',
    },
  });
  

export default AccountPage;