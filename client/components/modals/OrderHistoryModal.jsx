// OrderHistoryModal.js
import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';

const OrderHistoryModal = ({ visible, onClose, order }) => {

    // Use products array from the order object
    const orderItems = order.products || [];

    // Format price to US dollars
    const formatCurrency = (amountInCents) => {
        const amountInDollars = amountInCents / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amountInDollars);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.restaurantText}>{order.restaurant_name}</Text>
                            <Text style={styles.detailText}>Order Date: {new Date(order.created_at).toLocaleDateString()}</Text>
                            <Text style={styles.detailText}>Status: {order.status.toUpperCase()}</Text>
                            <Text style={styles.detailText}>Courier:{order.courier_name}</Text>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonIcon}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        <FlatList
                            style={styles.flatListContainer}
                            data={orderItems}
                            keyExtractor={(item) => item.product_id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.orderItem}>
                                    <Text style={styles.itemName}>{item.product_name}</Text>
                                    <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                                    <Text style={styles.itemPrice}>{formatCurrency(item.total_cost)}</Text>
                                </View>
                            )}
                            ListFooterComponent={
                                <View style={styles.totalContainer}>
                                    <Text style={styles.totalLabel}>TOTAL:</Text>
                                    <Text style={styles.totalAmount}>{formatCurrency(order.total_cost)}</Text>
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
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
    },
    restaurantText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DA583B',
        paddingBottom: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#222126',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 25,
    },
    closeButtonIcon: {
        fontSize: 24,
        color: '#aaa',
    },
    detailText: {
        fontSize: 14,
        color: 'white',
    },
    contentContainer: {
        flexGrow: 1,
        padding: 10,
        paddingBottom: 10,
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
        flex: 0.5,
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

export default OrderHistoryModal;
