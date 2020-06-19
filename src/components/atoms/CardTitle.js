import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardTitle = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {title}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    }, 
    text: {
        fontSize: 23,
        fontFamily: 'regular',
        color: '#F2913D'
    }
});

export default CardTitle;