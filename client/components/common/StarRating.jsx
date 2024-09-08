import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,

} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import  { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const iconSize = (percentage) => (width * percentage) / 100;
const apiUrl = Constants.expoConfig?.extra?.apiUrl;

const StarRating = ({ maxStars = 5, initialRating = 0, orderId, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating); // initial rating

    const updateRating = async (newRating) => {

        try {
            const response = await fetch(`${apiUrl}/api/order/${orderId}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ restaurant_rating: newRating }),
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                console.error('Failed to update rating: ', await response.json());
            } else {
                console.log('Rating updated successfully: ,',  await response.json());
            }

        } catch (error) {
            console.error('Error updating rating: ', error);
        }
    }

    // Determines which index star occupies in array
    const handleStarPress = (index) => {

        // Adds 1 to convert 0-based indexing
        const newRating = index + 1;

        console.log('Star pressed, updating rating to:', newRating);

        // Update state
        setRating(newRating); 

        // Parent callback
        onRatingChange && onRatingChange(newRating); 

        // Call the API
        updateRating(newRating);
    };

    return (
        <View style={styles.ratingContainer}>
            {[...Array(maxStars)].map((_, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleStarPress(index)}
                >
                    <FontAwesomeIcon
                        icon={index < rating ? faStar : faStarOutline}
                        size={iconSize(6)} // Set size dynamically to 6% of width
                        color={index < rating ? '#851919' : '#DA583B'} // 
                        style={styles.starIcon}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    starIcon: {
        marginHorizontal: 2,
    },
});

export default StarRating;