import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CourierPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Courier Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default CourierPage;