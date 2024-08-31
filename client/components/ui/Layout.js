import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native-safe-area-context'

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.content}>
                {children}
            </View>
            <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});

export default Layout;