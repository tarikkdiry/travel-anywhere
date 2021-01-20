import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import cardData from '../../data/data.json';
import Card from '../components/molecules/Card';
import * as firebase from 'firebase';
import { addCard, getCard} from '../api/CardsApi';
import BackArrow from '../../assets/back_arrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SelectScreen = ({ route, navigation }) => {
    // componentDidMount() {
    //     getCard(this.cardData[1]);
    // }

    const generateRandomIndex = () => {
        return Math.floor(Math.random() * cardData.length);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                activeOpacity={0.1}
                underlayColor="#DDDDDD"
                style={styles.arrow}
                onPress={() => {
                    navigation.pop();
                }}>
                <Image 
                    source={BackArrow}
                    style={styles.arrow}
                />
            </TouchableOpacity>
            <View style={styles.card}>
                <Card 
                    title={cardData[generateRandomIndex()].title}
                    description={cardData[generateRandomIndex()].description}
                />
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#03658C',
        padding: 20
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular'
    },
    arrow: {
        height: 50,
        width: 50,
        tintColor: 'white',
        marginTop: '20%'
    },
    card: {
        flex: 1,
        marginTop: '50%'
    }
});

export default SelectScreen;