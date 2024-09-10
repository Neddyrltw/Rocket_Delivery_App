import { useEffect, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import { useAuth } from './AuthContext';

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Get user from AuthContext

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;

    // Define fetchUserData function using useCallback
    const fetchUserData = useCallback(async () => {
        if (!user) {
            console.log('User not yet available, exiting fetchUserData');
            return; // exit if user not yet available
        }

        const { user_id, accountType } = user;
        console.log('this is what user contains: ', user);
        console.log('account type: ', accountType);
        console.log('user_id in UserContext: ', user_id);

        // Check if both user_id and accountType are defined
        if (!user_id) {
            console.warn('Missing user_id or accountType in user object:', user);
            setUserData(null); // Clear userData if user info is missing
            setLoading(false);
            return;
        }

        try {
            console.log('Fetching user data for user:', user);
            setLoading(true);
            
            // Convert account type to lowercase for the query parameter
            const formattedAccountType = accountType.toLowerCase();
            const response = await fetch(`${apiUrl}/api/account/${user_id}?type=${formattedAccountType}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Fetched user data:', data);

            setUserData(data); // Set the userData state with fetched data
        } catch (err) {
            setError(err);
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, user]);

    // Use useEffect to call fetchUserData when the user changes
    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user, fetchUserData]);

    return { userData, loading, error };
};

export default useUserData;
