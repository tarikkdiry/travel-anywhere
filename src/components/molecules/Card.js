import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Title from '../atoms/CardTitle';
import Description from '../atoms/CardDescription';
import cardData from '../../../data/data.json';

const Card = ({ title, description }) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Title 
                    title={title}
                />
            </View>
            <View style={styles.description}>
                <Description
                    description={description}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F2',
        height: 200,
        borderRadius: 15,
        borderTopWidth: 15,
        borderTopColor: '#F2913D',
        padding: 25,
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        elevation: 1
    },
    title: {

    },
    description: {
        marginTop: 20
    }

});

export default Card;