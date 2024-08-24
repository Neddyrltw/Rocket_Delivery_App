// RestaurantCard.js
import React from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from 'react-native';
import { getRestaurantImage } from './RestaurantImages';

// Get screen dimentions
const { width } = Dimensions.get('window');

const RestaurantCard = ({ restaurant }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={getRestaurantImage(restaurant.id)} style={styles.image} />
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
        width: width * 0.4, // Adjust width to 90% of screen width
        height: width * 0.4 * 1.25, // Adjust height to be proportional to width, e.g., 1.5 times the width
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#DDDDDD', // Light grey border
        // Shadows for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 3,
    },
    image: {
        width: '100%',
        height: '60%', // Adjust image height to occupy 60% of the card's height
    },
    infoContainer: {
        padding: 10,
        marginTop: 5,
        backgroundColor: '#FFF',
        height: '40%', // Adjust info container to occupy 40% of the card's height
    },
    name: {
        fontSize: 16, // Increase font size for better readability in larger cards
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16, // Increase font size for better readability
        color: '#777',
    },
    rating: {
        fontSize: 16, // Increase font size for better readability
        color: '#DA583B',
    },

});

export default RestaurantCard;
