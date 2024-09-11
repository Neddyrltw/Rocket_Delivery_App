import React, { createContext, useState, useContext } from 'react';
import Constants from 'expo-constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    accountType: '',
    customer_id: null,
    courier_id: null,
    user_id: null,
  });

  const apiUrl = Constants.expoConfig?.extra?.apiUrl;

  const login = async (email, password) => {

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response data:", data);
      if (data.success) {
        const user = {
          user_id: data.user_id,
          customer_id: data.customer_id,
          courier_id: data.courier_id,
        };
        setUserState(user);
        return user;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const setAccountType = (type) => {
    setUserState((prevState) => ({ ...prevState, accountType: type }));
  }

  const logout = () => {
    setUserState({
      accountType: '',
      customer_id: null,
      courier_id: null,
      user_id: null,
    });
  };

  return (
    <AuthContext.Provider value={{ userState, login, logout, setAccountType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
