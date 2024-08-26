// RestaurantCard.js
import React from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from 'react-native';
import { getRestaurantImage } from './RestaurantImages';

// Get screen dimentions
const { width } = Dimensions.get('window');

const RestaurantCard = ({ restaurant }) => {
    return (
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image source={getRestaurantImage(restaurant.id)} style={styles.image} />
          </View>
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
        width: width * 0.4, 
        height: width * 0.4 * 1.25, 
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        borderBottomWidth: 5,
        borderColor: '#DDDDDD',
        borderBottomColor: '#CCCCCC', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        height: '60%', 
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: 10,
        marginTop: 5,
        backgroundColor: '#FFF',
        height: '40%', 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    name: {
        fontSize: 16, 
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#777',
    },
    rating: {
        fontSize: 16,
        color: '#DA583B',
    },
});


export default RestaurantCard;
