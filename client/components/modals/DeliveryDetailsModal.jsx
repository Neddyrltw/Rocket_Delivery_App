import React, { useState, useEffect } from 'react';

import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import Constants from 'expo-constants';

const DeliveryDetailsModal = ({ visible, onClose, deliveryDetails }) => {

    const apiUrl = Constants.expoConfig?.data?.apiUrl;

    // Format price to US Dollars
    const formatCurrency = (amountInCents) => {
        const amountInDollars = amountInCents / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amountInDollars); 
    };

    // Handle modal close
    const handleClose = () => {
        onClose();
    };

    const trimmedAddress = (fullAddress) => {
        return fullAddress.split(',')[0];
      };

    if (!deliveryDetails) return null;


    const { customer_address, restaurant_name, created_at, products, total_cost, status} = deliveryDetails; 

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.pageHeaderText}>DELIVERY DETAILS</Text>
                            <Text style={styles.statusText}>Status: {status}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                             onPress={handleClose}
                        >
                            <Text style={styles.closeButtonIcon}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.modalText}>Delivery Address: {trimmedAddress(customer_address)}</Text>
                        <Text style={styles.modalText}>Restaurant: {restaurant_name}</Text>
                        <Text style={styles.modalText}>Order Date: {new Date(created_at).toLocaleDateString()}</Text>
                        <Text style= {styles.detailsText}>Order Details</Text>
                        <FlatList
                            style={styles.flatListContainer}
                            data={products}
                            keyExtractor={(item) => item.product_id.toString()}
                            renderItem={({item}) => (
                                <View style={styles.orderItem}>
                                    <Text style={styles.itemDescription}>{item.product_name}</Text>
                                    <View style={styles.quantityContainer}>
                                        <Text style={styles.itemDescription}>x{item.quantity}</Text>
                                    </View>
                                    <View style={styles.itemPriceContainer}>
                                        <Text style={styles.itemPrice}>{formatCurrency(item.total_cost)}</Text>         
                                    </View>
                                </View>
                            )}
                            ListFooterComponent={
                                <View style={styles.totalContainer}>
                                    <Text style={styles.totalLabel}>TOTAL:</Text>
                                    <Text style={styles.totalAmount}>{formatCurrency(total_cost)}</Text>
                                </View>
                            }
                        /> 
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '50%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
    },
    titleContainer: {
        width: '100%',
        backgroundColor: '#222126',
        paddingVertical: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // Ensures horizontal layout
    },
    textContainer: {
        flex: 1, // Takes up the remaining space
        alignItems: 'center',
    },
    pageHeaderText: {
        fontSize: 20,
        color: '#DA583B',
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        paddingLeft: 20,
    },
    statusText: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        paddingLeft: 15,
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    closeButtonIcon: {
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'right',
    },
    flatListContainer: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        width: '90%',
        marginVertical: 10,
    },
    modalText: {
        fontSize: 14,
        paddingBottom: 5,
    },
    detailsText: {
        marginVertical: 10,
        fontSize: 20,
        fontFamily: 'Oswald',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    itemDescription: {
        fontsize: 12,
        flex: 3,
    },
    itemName: {
        fontSize: 16,
        flex: 2,
    },
    quantityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemQuantity: {
        fontSize: 16,
        flex: 0.5,
        textAlign: 'center',
    },
    itemPriceContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    itemPrice: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        paddingTop: 10,
        marginTop: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    totalAmount: {
        fontSize: 18,
    },
});

export default DeliveryDetailsModal;