import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import cardData from '../../data/data.json';
import Card from '../components/molecules/Card';
import * as firebase from 'firebase';
import { addCard, getCard} from '../api/CardsApi';
import { ScrollView } from 'react-native-gesture-handler';
import BackArrow from '../../assets/back_arrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SelectScreen = ({ route, navigation }) => {
    const [userSelected, setUserSelected] = useState(false);

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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    {cardData.map(card => {
                        return (
                            <Card 
                                key={Math.random().toString()} // Doesn't have to be super secure
                                title={card.title}
                                description={card.description}
                            />
                        )
                    })}
                </View> 
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#03658C',
        padding: 20,
        height: '100%'
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
        marginTop: '20%',
        marginBottom: '10%'
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '10%'
    }
});

export default SelectScreen;