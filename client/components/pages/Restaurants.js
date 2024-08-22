import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants'

import {
    SafeAreaView,
    FlatList,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    const apiUrl = Constants.expoConfig?.extra?.apiUrl; 

    useEffect(() => {
        fetch(`${apiUrl}/api/restaurants`)
        .then(response => response.json())
        .then(data => setRestaurants(data.restaurants))
        .catch(error => console.error('Error fetching restaurants: ', error));
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.restaurantContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.restaurantImage} />
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantAddress}>{item.address}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
      },
      list: {
        paddingBottom: 20,
      },
      restaurantContainer: {
        backgroundColor: '#EEE',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
      },
      restaurantImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
      },
      restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
      },
      restaurantAddress: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
      },
    });
    
    export default Restaurants;
    