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
    const [rating, setRating] = useState(null);
    const [price, setPrice] = useState(null);

    const apiUrl = Constants.expoConfig?.extra?.apiUrl;

    const ratingOptions = [
        { key: 1, label: '1 Star' },
        { key: 2, label: '2 Stars' },
        { key: 3, label: '3 Stars' },
        { key: 4, label: '4 Stars' },
        { key: 5, label: '5 Stars' },
    ];

    const priceOptions = [
        { key: 1, label: '$' },
        { key: 2, label: '$$' },
        { key: 3, label: '$$$' },
    ];

    useEffect(() => {
        fetch(`${apiUrl}/api/restaurants`)
            .then((response) => response.json())
            .then((data) => setRestaurants(data))
            .catch((error) => console.error('Error fetching restaurants: ', error));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>NEARBY RESTAURANTS</Text>
                
                <View style={styles.rowContainer}>
                    <View style={styles.halfContainer}>
                        <Text style={styles.subText}>Rating</Text>
                        <ModalSelector
                            data={ratingOptions}
                            initValue="-- Select --"
                            onChange={(option) => setRating(option.key)}
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
                            initValue="-- Select --"
                            onChange={(option) => setPrice(option.key)}
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

            <ScrollView contentContainerStyle={styles.scrollableContainer}>
                <View style={styles.cardContainer}>
                    {restaurants.slice(0, Math.ceil(restaurants.length / 2)).map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </View>
                <View style={styles.cardContainer}>
                    {restaurants.slice(Math.ceil(restaurants.length / 2)).map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </View>
            </ScrollView>
            {/* Spacer at the bottom */}
            <View style={styles.bottomSpacer} />
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
        paddingVertical: 10,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    dropdownButton: {
        height: 40,
        backgroundColor: '#DA583B',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingRight: 20,
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
        marginTop: 10,
    },
    subText: {
        fontSize: 20,
        fontFamily: 'Oswald',
    },
    scrollableContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        borderWidth: 1,
    },
    scrollableContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    halfScrollableContainer: {
        flex: 1, 
        marginHorizontal: 5, 
        backgroundColor: '#F5F5F5',
    },
    scrollableContent: {
        flexGrow: 1,
    },
});

export default Restaurants;
