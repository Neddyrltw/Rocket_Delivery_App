import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const OrderPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>RESTAURANT MENU</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.restaurantName}>Restaurant Name</Text>
                        <Text style={styles.subText}>Price: {'$'.repeat(3)}</Text>
                        <Text style={styles.subText}>Rating: {'★'.repeat(4)}</Text>
                    </View>
                    <TouchableOpacity style={styles.rightContainer}>
                        <Text style={styles.buttonText}>Create Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    headerText: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Oswald',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flext-start',
        marginTop: 10,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    rightContainer: {
        width: '40%',
        backgroundColor: '#DA583B',
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subText: {
        fontSize: 14,
    },
    buttonText: {
        color: '#FFFFFF',
        backgroundColor: '#DA583B',
        fontSize: 18,
        fontFamily: 'Oswald',
        padding: 5,
    },
    button: {
        width: '30%',
        alignItems: 'center',
    },
});

export default OrderPage;
