import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardDescription = ({ description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {description}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    }, 
    text: {
        fontSize: 15,
        fontFamily: 'bold',
        color: '#F2913D'
    }
});

export default CardDescription;