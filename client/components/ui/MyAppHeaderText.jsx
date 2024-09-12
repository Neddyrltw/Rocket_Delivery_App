import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MyAppHeaderText = ({ children }) => {
  return (
    <Text style={styles.headerText}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    fontFamily: 'Oswald',
    fontWeight: 'bold',
  },
});

export default MyAppHeaderText;