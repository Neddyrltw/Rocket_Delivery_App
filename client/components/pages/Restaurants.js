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
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headerText}>NEARBY RESTAURANTS</Text>
                
                <View style={styles.rowContainer}>
                    <View style={styles.halfContainer}>
                        <Text style={styles.subText}>Rating</Text>
                        <View style={styles.dropdownButton}>
                            <Text style={styles.buttonText}>-- Select --</Text>
                        </View>
                    </View>

                    <View style={styles.halfContainer}>
                        <Text style={styles.subText}>Price</Text>
                        <View style={styles.dropdownButton}>
                            <Text style={styles.buttonText}>-- Select --</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.headerText}>RESTAURANTS</Text>
            </View>
        </SafeAreaView>
    );
};
    
const styles = StyleSheet.create({
    bottomContainer: {
        flex: 3,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 10,
        backgroundColor: '#FFFFFF'
    },
    dropdownButton: {
        height: 40,
        backgroundColor: '#DA583B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingRight: 20, // Add padding between the two half containers
        borderRadius: 1,
        borderColor: 'red',
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
    topContainer: {
        flex: .80,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
});
    
    export default Restaurants;
    