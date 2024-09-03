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
            try {
                
                // Pull user data from AsyncStorage
                const userString = await AsyncStorage.getItem('userData');
                if (userString) {
                    // Parse user data for id and type
                    const { user_id, accountType } = JSON.parse(userString);

                    // Format type to lowercase
                    const formattedAccountType = accountType.toLowerCase();

                    // Perform API call with id and formatted type
                    const response = await fetch(`${apiUrl}/api/account/${user_id}?type=${formattedAccountType}`);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log('User Data: ', data);

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