import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GameCode = ({ code }) => {
    return (
        <View style={styles.container}>
            {code}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    }
});