import React, {
  createContext,
  useState,
  useEffect, 
  useContext
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {

      try { 
        const storedUser = await AsyncStorage.getItem('userData');
        console.log('Raw user data from AsyncStorage:', storedUser);

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('Loaded user from AsyncStorage:', parsedUser);
          setUser(parsedUser);
        } else {
          console.log('No user data found in AsyncStorage');        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUser();

  }, []);

  const login = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };
  
  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  };

  // Update account type
  const setAccountType = async (type) => {
    try {
      const updatedUser = { ...user, accountType: type};
      setUser(updatedUser);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      console.log('Account type set to:', type); // Debug line
    } catch (err) {
      console.error('Failed to set account type: ', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setAccountType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);