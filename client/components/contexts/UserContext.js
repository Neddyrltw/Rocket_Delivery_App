import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;

    // Define fetchUserData function using useCallback
    const fetchUserData = useCallback(async () => {
        try {
            setLoading(true);
            const userString = await AsyncStorage.getItem('userData');
            if (userString) {
                const { user_id, accountType } = JSON.parse(userString);
                const formattedAccountType = accountType.toLowerCase();
                const response = await fetch(`${apiUrl}/api/account/${user_id}?type=${formattedAccountType}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setUserData(data);
            }
        } catch (err) {
            setError(err);
            console.error('Failed to fetch data: ', err);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

        // Use useEffect to call fetchUserData when the component mounts
        useEffect(() => {
            fetchUserData();
        }, [fetchUserData]);

        return { userData, loading, error };
};

export default useUserData;