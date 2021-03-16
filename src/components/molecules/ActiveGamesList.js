import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import ActiveGamesItem from '../atoms/ActiveGamesItem';

const ActiveGamesList = ({ sessionListHost, sessionListPlayer, selection }) => {
    const isSingle = (count) => {
        if (count == 1) {
            return count + ' traveler';
        } else {
            return count + ' travelers';
        }
    };

    return (
        // Query based on hosted games vs participant games
        <View style={styles.container}>
            {selection ?
                sessionListHost.map((session, index) => {
                    return (
                        <View key={index}>
                            <ActiveGamesItem 
                                session={session[0]}
                                playerCount={isSingle(session[1])}
                            />
                        </View>
                    )
                })
                : 
                sessionListPlayer.map((session, index) => {
                    return (
                        <View key={index}>
                            <ActiveGamesItem 
                                session={session[0]}
                                playerCount={session[1]}
                            />
                        </View>
                    )
                })
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ActiveGamesList;