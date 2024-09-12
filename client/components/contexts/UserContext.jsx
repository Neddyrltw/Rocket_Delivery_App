import { useEffect, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import { useAuth } from './AuthContext';

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userState } = useAuth(); // Get user from AuthContext

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;

    // Define fetchUserData function using useCallback
    const fetchUserData = useCallback(async () => {
        if (!userState || !userState.user_id) {
            return;
        }

        try {
            setLoading(true);
            
            const formattedAccountType = userState.accountType.toLowerCase();
            const response = await fetch(`${apiUrl}/api/account/${userState.user_id}?type=${formattedAccountType}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserData(data); 

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, userState]);

    // Use useEffect to call fetchUserData when the user changes
    useEffect(() => {
        fetchUserData();
    }, [userState, fetchUserData]);

    return { userData, loading, error };
};

export default useUserData;
