import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Button = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ title }</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 1,
    },
    text: {
        color: 'white',
        fontSize: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Button;