import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import RestaurantMenu from '../../assets/Images/RestaurantMenu.jpg';

const OrderCard = ({ item, quantity, increment, decrement }) => {
    const formatCurrency = (amountInCents) => {
        const amountInDollars = amountInCents / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amountInDollars);
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.leftContainer}>
                <Image source={RestaurantMenu} style={styles.image} />
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{formatCurrency(item.cost)}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity onPress={decrement} style={styles.iconContainer}>
                    <Text style={styles.iconText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increment} style={styles.iconContainer}>
                    <Text style={styles.iconText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: '15%',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 5,
    },
    leftContainer: {
        flex: 1.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    centerContainer: {
        flex: 2.5,
        paddingLeft: 10,
        justifyContent: 'flex-start',
    },
    itemName: {
        fontSize: 18,
        fontFamily: 'Oswald',
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    iconText: {
        fontSize: 18,
        color: '#fff',
    },
    rightContainer: {
        flex: 1.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 15,
    },
    iconContainer: {
        backgroundColor: '#222126',
        borderRadius: 40,
        width: '30%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

export default OrderCard;
