import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import ActiveGamesItem from '../atoms/ActiveGamesItem';

const ActiveGamesList = ({ sessionListHost, sessionListPlayer, selection }) => {
    return (
        // Query based on hosted games vs participant games
        <View style={styles.container}>
            {!selection ?
                sessionListHost.map((session, index) => {
                    return (
                        <View key={index}>
                            <ActiveGamesItem 
                                session={session[0]}
                                playerCount={session[1]}
                            />
                        </View>
                    )
                })
                : 
                <Text>Active</Text>
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