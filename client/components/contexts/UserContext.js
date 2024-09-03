import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;


    useEffect(() => {
        const fetchUserData = async () => {
            console.log('Fetching user data');
            try {
                const userString = await AsyncStorage.getItem('userData');
                if (userString) {
                    const { user_id, accountType } = JSON.parse(userString);

                    const formattedAccountType = accountType.toLowerCase();
                    console.log('Account type: ', formattedAccountType);

                    const response = await fetch(`${apiUrl}/api/account/${user_id}?type=${formattedAccountType}`);
                    console.log('Response: ', response);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                   console.log('data: ', data);

                    setUserData(data);
                }
            } catch (err) {
                setError(err);
                console.error('Failed to fetch data: ', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [apiUrl]);

    return { userData, loading, error };
};

export default useUserData;