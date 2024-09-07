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

const { width } = Dimensions.get('window');

const iconSize = (percentage) => (width * percentage) / 100;

const StarRating = ({ maxStars = 5, initialRating = 0, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating); // initial rating

    // Determines which index star occupies in array
    const handleStarPress = (index) => {

        // Adds 1 to convert 0-based indexing
        const newRating = index + 1;

        // Update state
        setRating(newRating); 

        // Parent callback
        onRatingChange && onRatingChange(newRating); 
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
                        size={iconSize(6)} // Set size dynamically (8% of screen width)
                        color={index < rating ? '#851919' : '#DA583B'} // Gold for filled, Silver for outline
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
        marginHorizontal: 2, // Add margin for spacing between stars
    },
});

export default StarRating;