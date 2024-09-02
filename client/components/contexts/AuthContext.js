import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {

      try { 
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
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
      await AsyncStorage .setItem('userData', JSON.stringify(updatedUser));
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
