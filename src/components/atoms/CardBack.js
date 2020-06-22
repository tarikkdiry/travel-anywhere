import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardBack = ({ title, description }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{ title }</Text>
            </View>
            <View>
                <Text style={styles.description}>{ description }</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 23,
        fontFamily: 'regular',
        color: '#F2913D'
    },
    description: {
        fontSize: 15,
        fontFamily: 'bold',
        color: '#F2913D',
        marginTop: 20
    }
});

export default CardBack;