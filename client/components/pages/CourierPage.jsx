import React, { useState } from 'react';
import { Text, View, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';

const MyDeliveries = () => {
  const [deliveries, setDeliveries] = useState([
    { id: '123', address: '123 Main St', status: 'delivered' },
    { id: '124', address: '456 Park Ave', status: 'pending' },
    { id: '125', address: '789 Broadway', status: 'in progress' },
  ]);

  const handleViewDetails = (delivery) => {
    // Placeholder function for viewing delivery details
  };

  const getStatusButtonColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#851919';  // Red
      case 'in progress':
        return '#DA583B';  // Orange
      case 'delivered':
        return '#609475';  // Green
      default:
        return '#851919';  // Default color if status is not recognized
    }
  };

  const handleStatusChange = (id) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) => {
        if (delivery.id === id) {
          let newStatus;
          switch (delivery.status) {
            case 'pending':
              newStatus = 'in progress';
              break;
            case 'in progress':
              newStatus = 'delivered';
              break;
            case 'delivered':
              newStatus = 'pending';
              break;
            default:
              newStatus = 'pending';
          }
          return { ...delivery, status: newStatus };
        }
        return delivery;
      })
    );
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
            <Text style={[styles.cellText, styles.addressColumn]}>{item.address}</Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity
              style={[styles.statusButton,
              { backgroundColor: getStatusButtonColor(item.status)

              }]}
              onPress={() => handleStatusChange(item.id)}
              >
                <Text style={styles.buttonText}>{item.status.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.iconCell} onPress={() => handleViewDetails(item)}>
              <FontAwesomeIcon style={styles.icon} icon={faMagnifyingGlassPlus} />
            </TouchableOpacity>
          </View>
        )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 10,  // Adjust padding to align with rows
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    flex: 1,  // Adjust to fill available space
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

  

export default MyDeliveries;
