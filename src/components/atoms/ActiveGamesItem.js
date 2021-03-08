import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';

// onClick navigate to Game.js, pass in session and user
const ActiveGamesItem = ({ session, playerCount }) => {
    return (
        <View style={styles.container}>
            <View style={styles.session}>
                <Text style={styles.text}>{session}</Text>
            </View>
            <View style={styles.playerCount}>
                <Text style={styles.text}>{playerCount}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: '10%',
        paddingBottom: 40,
        justifyContent: 'space-between'
    },
    session: {
        display: 'flex'
    },
    playerCount: {
        display: 'flex'
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'regular',
    }
})

export default ActiveGamesItem;