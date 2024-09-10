import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import OrderHistoryModal from '../modals/OrderHistoryModal';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OrderHistory = () => {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        // Fetch user data from AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { customer_id } = JSON.parse(userData);

          if (customer_id) {
            const type = 'customer';

            // Fetch orders for the customer
            const response = await fetch(`${apiUrl}/api/orders?id=${customer_id}&type=${type}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch orders, status: ${response.status}`);
            }

            // Receive db response
            const data = await response.json();

            // Sort orders by date descending
            const sortedOrders = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setOrders(data);

          } else {
            throw new Error('Customer ID not found in user data');
          }
        } else {
          throw new Error('User data not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchOrders();
  }, []); 

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>MY ORDERS</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>ORDER</Text>
        <Text style={styles.headerText}>STATUS</Text>
        <Text style={styles.headerText}>VIEW</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cellText}>{item.restaurant_name}</Text>
            <Text style={styles.cellText}>{item.status.toUpperCase()}</Text>
            <TouchableOpacity
              style={styles.iconCell}
              onPress={() => handleViewDetails(item)}
            >
              <FontAwesomeIcon
                style={styles.icon}
                icon={faMagnifyingGlassPlus}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {selectedOrder && (
        <OrderHistoryModal
          visible={modalVisible}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  pageHeader: {
    padding: 10
  },
  pageHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222126',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
  },
  iconCell: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: "#333",
  },
});

export default OrderHistory;
