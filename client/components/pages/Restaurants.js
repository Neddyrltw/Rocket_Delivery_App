import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import ModalSelector from 'react-native-modal-selector';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
} from 'react-native';

import RestaurantCard from '../ui/RestaurantCard';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [rating, setRating] = useState(null);
    const [price, setPrice] = useState(null);

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;

    const ratingOptions = [
        { key: 'clear', label: 'Clear Selection' }, // Add clear option
        { key: 1, label: '1 Star' },
        { key: 2, label: '2 Stars' },
        { key: 3, label: '3 Stars' },
        { key: 4, label: '4 Stars' },
        { key: 5, label: '5 Stars' },
    ];

    const priceOptions = [
        { key: 'clear', label: 'Clear Selection' }, // Add clear option
        { key: 1, label: '$' },
        { key: 2, label: '$$' },
        { key: 3, label: '$$$' },
    ];

    useEffect(() => {
        fetch(`${apiUrl}/api/restaurants`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data);
                setFilteredRestaurants(data); // Initialize filtered data
            })
            .catch((error) => console.error('Error fetching restaurants: ', error));
    }, []);

    useEffect(() => {
        filterRestaurants(); // Trigger filter when rating or price changes
    }, [rating, price]);

    const filterRestaurants = () => {
        let filtered = restaurants;

        if (rating !== null) {
            filtered = filtered.filter(restaurant => restaurant.rating === rating);
        }

        if (price !== null) {
            filtered = filtered.filter(restaurant => restaurant.price_range === price);
        }

        setFilteredRestaurants(filtered);
    };

    const handleRatingChange = (option) => {
        if (option.key === 'clear') {
            setRating(null); // Clear the selection
        } else {
            setRating(option.key);
        }
    };

    const handlePriceChange = (option) => {
        if (option.key === 'clear') {
            setPrice(null); // Clear the selection
        } else {
            setPrice(option.key);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>NEARBY RESTAURANTS</Text>
                
                <View style={styles.rowContainer}>
                    <View style={styles.halfContainer}>
                        <Text style={styles.subText}>Rating</Text>
                        <ModalSelector
                            data={ratingOptions}
                            initValue={rating ? `${rating} Stars` : '-- Select --'}
                            onChange={handleRatingChange}
                            style={styles.dropdownButton}
                            selectTextStyle={styles.buttonText}
                            cancelTextStyle={styles.buttonText}
                            optionTextStyle={styles.buttonText}
                            cancelStyle={styles.dropdownButton}
                            optionStyle={styles.dropdownButton}
                        />
                    </View>

                    <View style={styles.halfContainer}>
                        <Text style={styles.subText}>Price</Text>
                        <ModalSelector
                            data={priceOptions}
                            initValue={price ? `${'$'.repeat(price)}` : '-- Select --'}
                            onChange={handlePriceChange}
                            style={styles.dropdownButton}
                            selectTextStyle={styles.buttonText}
                            cancelTextStyle={styles.buttonText}
                            optionTextStyle={styles.buttonText}
                            cancelStyle={styles.dropdownButton}
                            optionStyle={styles.dropdownButton}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.headerText}>RESTAURANTS</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollableContainer}>
                <View style={styles.halfContainer}>
                    {filteredRestaurants.slice(0, Math.ceil(filteredRestaurants.length / 2)).map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </View>

                <View style={styles.halfContainer}>
                    {filteredRestaurants.slice(Math.ceil(filteredRestaurants.length / 2)).map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </View>
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
    bottomContainer: {
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingRight: 20,
    },
    subText: {
        fontSize: 20,
        fontFamily: 'Oswald',
    },
    dropdownButton: {
        height: 40,
        backgroundColor: '#DA583B',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    headerText: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Oswald',
    },
    scrollableContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: -3,
        backgroundColor: '#FFFFFF',
    },
});

export default Restaurants;
