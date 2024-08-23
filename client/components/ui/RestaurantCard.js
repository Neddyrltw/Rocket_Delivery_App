// RestaurantCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RestaurantCard = ({ restaurant }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.price}>{'$'.repeat(restaurant.price_range)}</Text>
                <Text style={styles.rating}>{'★'.repeat(restaurant.rating)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '50%',
    },
    infoContainer: {
        padding: 10,
        backgroundColor: '#FFF',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#777',
    },
    rating: {
        fontSize: 14,
        color: '#DA583B',
    },
});

export default RestaurantCard;
