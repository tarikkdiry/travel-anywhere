import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActiveGamesList from '../molecules/ActiveGamesList';

const ActiveGamesMenu = ({ hosting, sessionListPlayer }) => {
    const [isHosting, setIsHosting] = useState(false);

    const switchModeHandler = () => {
        console.log(`Hosting: ${isHosting}`);3
        setIsHosting(!isHosting);
    };

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => switchModeHandler()}>
                    <Text style={styles.text}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchModeHandler()}>
                    <Text style={styles.text}>Hosting</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <ActiveGamesList 
                    sessionListHost={hosting}
                    sessionListPlayer={sessionListPlayer}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white', 
        fontFamily: 'regular',
    },
    list: {
        display: 'flex'
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'regular',
    }
})

export default ActiveGamesMenu;