import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import BackArrow from '../../assets/back_arrow.png';

const ActiveGames = ({ route, navigation, userEmail}) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity 
                    activeOpacity={0.1}
                    underlayColor="#DDDDDD"
                    style={styles.arrow}
                    onPress={() => {
                        navigation.pop()
                    }}>
                <Image 
                    source={BackArrow}
                    style={styles.arrow}
                />
                </TouchableOpacity>
                <Text style={styles.text}>Active Games</Text> 
            </View>
            <View style={styles.bottom}>
                <Text>Host vs. Guest</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#023859',
        padding: 20
    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 3,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular',
        marginTop: '20%',
        padding: 20
    },
    arrow: {
        height: 50,
        width: 50,
        tintColor: 'white',
        marginTop: '20%'
    },
    userInput: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start'
    },
    input: {
        height: 60,
        borderColor: 'white',
        borderBottomWidth: 0.2,
        color: 'white',
        marginVertical: 15,
        fontSize: 30,
        fontFamily: 'regular',
    },
    continue: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '10%'
    },
    button: {
        width: '50%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20
    }
});

export default ActiveGames;