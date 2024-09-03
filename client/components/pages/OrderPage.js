import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import OrderCard from '../ui/OrderCard';
import OrderConfirmation from '../modals/OrderConfirmation';

const OrderPage = ({ route }) => {
    const { restaurant } = route.params || {}; // get restaurant object
    const restaurantId = restaurant ? restaurant.id : null
    const [menuItems, setMenuItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [modalVisibility, setModalVisibility] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const apiUrl = Constants.expoConfig?.extra?.apiUrl; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch customer id
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const { customer_id } = JSON.parse(userData);
                    setCustomerId(customer_id);
                }
    
                // Fetch menu items
                const response = await fetch(`${apiUrl}/api/products?restaurant=${restaurant.id}`);
                const data = await response.json();
                setMenuItems(data);
                setQuantities(data.reduce((acc, item) => ({ ...acc, [item.id]: 0}), {})); // initialize quantities
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
    
        fetchData();
    }, [restaurant, apiUrl]);

    const increment = (itemId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: prevQuantities[itemId] + 1,
        }));
    };

    const decrement = (itemId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max(prevQuantities[itemId] - 1, 0),
        }));
    };

    const totalQuantity = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);

    const handleCreateOrder = () => {
        if (totalQuantity > 0 && customerId && restaurantId) {
            setModalVisibility(true);
        }
    };

    const handleCloseModal = () => {
        setQuantities(menuItems.reduce((acc, item) => ({ ...acc, [item.id]: 0}), {}));
        setModalVisibility(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>RESTAURANT MENU</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.restaurantName}>{restaurant.name}</Text>
                        <Text style={styles.subText}>Price: {'$'.repeat(3)}</Text>
                        <Text style={styles.subText}>Rating: {'★'.repeat(4)}</Text>
                    </View>
                    <TouchableOpacity
                    style={[
                        styles.rightContainer,
                        totalQuantity > 0 ? styles.activeButton : styles.inactiveButton
                    ]}
                    onPress={handleCreateOrder}
                    disabled={totalQuantity === 0}
                    >
                        <Text style={styles.buttonText}>Create Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollableContainer}>
                {menuItems.map(item => (
                    <OrderCard
                        key={item.id}
                        item={item}
                        quantity={quantities[item.id]}
                        increment={() => increment(item.id)}
                        decrement={() => decrement(item.id)}
                    />
                ))}
            </ScrollView>

            <OrderConfirmation
                visible={modalVisibility}
                onClose={handleCloseModal}
                menuItems={menuItems}
                quantities={quantities}
                restaurantId={restaurantId}
                customerId={customerId}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 10,
    },
    topContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    rightContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#DA583B',
        borderRadius: 5,
    },
    activeButton: {
        backgroundColor: '#DA583B',
    },
    inactiveButton: {
        backgroundColor: '#A54730',  // Darker orange for disabled state
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    scrollableContainer: {
        flexGrow: 1,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 18,
    },
});

export default OrderPage;
