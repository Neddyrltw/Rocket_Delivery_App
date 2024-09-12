import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import DeliveryDetailsModal from '../modals/DeliveryDetailsModal';
import Constants from 'expo-constants';


const CourierPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const { userState } = useAuth();
  
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const { courier_id } = userState;

        if (courier_id) {
          const type = 'courier';

          // Fetch deliveries for the courier
          const response = await fetch(`${apiUrl}/api/orders?id=${courier_id}&type=${type}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch deliveries, status: ${response.status}`);
          }

          const data = await response.json();

          // Sort deliveries by date descending
          const sortedDeliveries = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setDeliveries(sortedDeliveries);

        } else {
          throw new Error('Courier ID not found in user state');
        }
      } catch (error) {
        console.error('Fetch error: ', error);
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [userState, apiUrl]); 

  const trimmedAddress = (fullAddress) => {
    return fullAddress.split(',')[0];
  };

  const handleViewDetails = (item) => {
    setSelectedDelivery(item);
    setModalVisible(true);
  };

  const getStatusButtonColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#851919';  // Red
      case 'in progress':
        return '#DA583B';  // Orange
      case 'delivered':
        return '#9ACDA7';  // Green
      default:
        return '#851919';  // Default color if status is not recognized
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    let newStatus;

    switch (currentStatus) {
      case 'pending':
        newStatus = 'in progress';
        break;
      case 'in progress':
        newStatus = 'delivered';
        break;
      default:
        newStatus = 'pending'
    } 

    try {
      // Api call to update status
      const response = await fetch(`${apiUrl}/api/order/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
    });

    if (!response.ok) {
      throw new Error(`Failed to update order status, status: ${response.status}`);
    }

    // Update state  if the API  call is successful
    setDeliveries((prevDeliveries) => 
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>MY DELIVERIES</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.orderIdColumn]}>ORDER ID</Text>
        <Text style={[styles.headerText, styles.addressColumn]}>ADDRESS</Text>
        <Text style={[styles.headerText, styles.statusColumn]}>STATUS</Text>
        <Text style={[styles.headerText, styles.viewColumn]}>VIEW</Text>
      </View>
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={[styles.cellText, styles.orderIdColumn]}>{item.id}</Text>
            <Text style={[styles.cellText, styles.addressColumn]}>
              {trimmedAddress(item.customer_address)}
            </Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  { backgroundColor: getStatusButtonColor(item.status) }
                ]}
                onPress={() => handleStatusChange(item.id, item.status)}
                disabled={item.status.toLowerCase() === 'delivered'}
              >
                <Text style={styles.buttonText}>{item.status.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.iconCell}
              onPress={() => handleViewDetails(item)}
            >
              <FontAwesomeIcon
                style={styles.icon}
                icon={faMagnifyingGlassPlus} />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Render the DeliveryDetailsModal */}
      <DeliveryDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        deliveryDetails={selectedDelivery}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 20,
    backgroundColor: '#FFFFFF',
  },
  pageHeader: {
    padding: 10,

  },
  pageHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222126',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cellText: {
    textAlign: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  orderIdColumn: {
    flex: 0.75,
    paddingLeft: 5,
  },
  addressColumn: {
    flex: 2,
  },
  statusColumn: {
    flex: 1.5,
  },
  statusContainer: {
    flex: 1.5,
    alignItems: 'center',
  },
  statusButton: {
    width: '90%',
    backgroundColor: '#851919',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 7,
  },
  viewColumn: {
    flex: 0.75,
    alignItems: 'center',
  },
  iconCell: {
    flex: 0.75,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#333',
  },
});

export default CourierPage;
