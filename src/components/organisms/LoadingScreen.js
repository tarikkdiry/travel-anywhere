import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

const LoadingScreen = ({ text }) => {
    return(
        <View style={styles.container}>
            <View style={styles.loading}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
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
    },
    text: {
        fontFamily: 'regular',
        fontSize: 40, 
        color: 'white'
    }
});

export default LoadingScreen;