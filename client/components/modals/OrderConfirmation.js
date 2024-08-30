import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Constants from 'expo-constants';

const OrderConfirmation = ({ visible, onClose, menuItems, quantities, restaurantId, customerId }) => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null);
    const apiUrl = Constants.expoConfig?.extra?.apiUrl;

    // Calculate toal cost
    const calculateTotalPrice = () => {
        return menuItems.reduce((total, item) => {
            const quantity = quantities[item.id] || 0;
            return total + item.cost * quantity;
        }, 0);
    };

    // Format price to US dollars
    const formatCurrency = (amountInCents) => {
        const amountInDollars = amountInCents / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amountInDollars);
    };

    // Filter quantities to display only those > 0
    const orderItems = menuItems.filter(item => quantities[item.id] > 0);

    // Handle order creation
    const handleCreateOrder = async () => {

        setIsProcessing(true);

        if (!apiUrl) {
            console.error('API URL is not defined.');
            setIsProcessing(false);
            return;
        }

        try {

            // Force failure for testing
            throw new Error('Forced error for testing');

            const orderPayload = {  
                restaurant_id: restaurantId,
                customer_id: customerId,
                products: menuItems
                    .filter(item => quantities[item.id] > 0)
                    .map(item => ({
                        id: item.id,
                        quantity: quantities[item.id],
                    }))
            };


            const response = await fetch(`${apiUrl}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setOrderStatus('success');

        } catch (error) {
            console.error('Error creating order', error);
            setOrderStatus('failure');
        } finally {
            setIsProcessing(false);
        }
    };

    // Reset state when done
    const handleClose = () => {
        setOrderStatus(null);
        onClose();
    };

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
                        <Text style={styles.modalTitle}>ORDER CONFIRMATION</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                            <Text style={styles.closeButtonIcon}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.modalText}>Order Summary</Text>
                        <FlatList
                            style={styles.flatListContainer}
                            data={orderItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.orderItem}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemQuantity}>x{quantities[item.id]}</Text>
                                    <Text style={styles.itemPrice}>{formatCurrency(item.cost * quantities[item.id])}</Text>
                                </View>
                            )}
                            ListFooterComponent={
                                <View style={styles.totalContainer}>
                                    <Text style={styles.totalLabel}>TOTAL:</Text>
                                    <Text style={styles.totalAmount}>{formatCurrency(calculateTotalPrice())}</Text>
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        {orderStatus === 'success' ? (
                            <View style={styles.successMessageContainer}>
                               <View style={styles.successIconContainer}>
                                    <Text style={styles.successIcon}>✓</Text>
                                </View>
                                <Text style={styles.successText}>Thank you!</Text>
                                <Text style={styles.successSubText}>Your order has been received</Text>
                            </View>
                        ) : orderStatus === 'failure' ? (
                            <View style={styles.failureMessageContainer}>
                                <View style={styles.failureIconContainer}>
                                    <Text style={styles.failureIcon}>✗</Text>
                                </View>
                                <Text style={styles.failureText}>Your order was not processed correctly.</Text>
                                <Text style={styles.failureSubText}>Please try again.</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.orderConfirmation}
                                onPress={handleCreateOrder}
                                disabled={isProcessing}
                            >
                                <Text style={styles.orderConfirmationText}>
                                    {isProcessing ? 'PROCESSING ORDER' : 'CONFIRM ORDER'}</Text>
                            </TouchableOpacity>
                      )}
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
        padding: 10,
        borderWidth: 1,
    },
    titleContainer: {
        width: '100%',
        backgroundColor: '#222126',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 15,
    },
    closeButtonIcon: {
        fontSize: 24,
        color: '#aaa',
        justifyContent: 'center',
        paddingRight: 10,
    },
    flatListContainer: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 10,
        paddingBottom: 10
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingBottom: 5,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        flex: 2,
        padding: 5,
    },
    itemQuantity: {
        fontSize: 16,
        flex: .5,
        textAlign: 'center',
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
        borderTopWidth: 1,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    totalAmount: {
        fontSize: 18,
    },
    buttonContainer: {
        width: '100%',
        paddingTop: 20,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    orderConfirmation: {
        backgroundColor: '#DA583B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    orderConfirmationText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
    successMessageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    successIconContainer: { 
        backgroundColor: '#28a745',
        width: '10%',          // Relative size of the circle
        aspectRatio: 1,        // Keep the width and height equal
        borderRadius: 100,     // Large borderRadius to make it circular
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIcon: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    successText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    successSubText: {
        fontSize: 16,
        textAlign: 'center',
    },
    failureMessageContainer: {
        alignItems: 'center',
    },
    failureIconContainer: {
        backgroundColor: '#D32F2F',
        width: '10%',
        aspectRatio: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    failureIcon: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    failureText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
    },
    failureSubText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default OrderConfirmation;
