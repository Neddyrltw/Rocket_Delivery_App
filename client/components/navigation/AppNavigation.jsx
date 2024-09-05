import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';
import CourierPage from '../pages/CourierPage';

import SelectAccountType from '../pages/SelectAccountType';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const  { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        {user.customer_id && user.courier_id ? (
                            <Stack.Screen name="SelectAccountType" component={SelectAccountType} />
                        ) : user.customer_id ? (
                            <Stack.Screen name="MainCustomerPage" component={MainCustomerPage} />
                        ) : (
                            <Stack.Screen name="MainCourierPage" component={CourierPage} />
                        )}
                    </>
                ) : (<Stack.Screen name="Login" component={Login} /> 
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;