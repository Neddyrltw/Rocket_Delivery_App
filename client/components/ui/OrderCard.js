import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OrderCard = ({ item }) => {
    const [quantity, setQuantity] = useState(0);

    const increment = () => {
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        setQuantity(quantity - 1 );
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.leftContainer}>
                {/* Placeholder for Image */}
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity onPress={decrement} style={styles.iconContainer}>
                    <Text style={styles.iconText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increment} style={styles.iconContainer}>
                    <Text style={styles.iconText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: '15%',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 5,
    },
    leftContainer: {
        flex: 1.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    centerContainer: {
        flex: 2.5,
        paddingLeft: 10,
        justifyContent: 'flex-start',
    },
    itemName: {
        fontSize: 18,
        fontFamily: 'Oswald',
    },
    itemPrice: {
        fontsize: 16,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    iconText: {
        color: '#fff',
    },
    rightContainer: {
        flex: 1.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 15,
    },
    iconContainer: {
        backgroundColor:'#222126',
        borderRadius: 30,
        width: '23%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

export default OrderCard;
