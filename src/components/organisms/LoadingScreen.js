import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

const LoadingScreen = ({ text }) => {
    return(
        <div style={styles.container}>
            <div style={styles.loading}>
                {text}
            </div>
        </div>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#023859'
    },
    loading: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'regular',
        fontSize: 40, 
    }
});

export default LoadingScreen;