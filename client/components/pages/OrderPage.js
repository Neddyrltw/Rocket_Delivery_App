import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OrderCard
 from '../ui/OrderCard';
const OrderPage = () => {
    const sampleItems = [
        { name: 'Burger', price: '13.99', description: 'A delicious beef burger', image: 'https://via.placeholder.com/50' },
        { name: 'Pizza', price: '$24.99', description: 'Cheesy pizza with pepperoni', image: 'https://via.placeholder.com/50' },
        // Add more items here
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>RESTAURANT MENU</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.restaurantName}>Golden Shower</Text>
                        <Text style={styles.subText}>Price: {'$'.repeat(3)}</Text>
                        <Text style={styles.subText}>Rating: {'★'.repeat(4)}</Text>
                    </View>
                    <TouchableOpacity style={styles.rightContainer}>
                        <Text style={styles.buttonText}>Create Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollableContainer}>
                {sampleItems.map((item, index) => (
                    <OrderCard key={index} item={item} />
                ))}
            </ScrollView>
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
