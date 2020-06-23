import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardFront = () => {
    const cardMessages = [
        {
            "message": "Click me!"
        },
        {
            "message": "Are you ready?"
        },
        {
            "message": "Flip me!!!"
        }
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {cardMessages[1].message}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontSize: 35,
        fontFamily: 'regular',
        color: 'white'
    }
});

export default CardFront;