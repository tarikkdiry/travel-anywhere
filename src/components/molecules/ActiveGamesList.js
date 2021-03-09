import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import ActiveGamesItem from '../atoms/ActiveGamesItem';

const ActiveGamesList = ({ sessionListHost, sessionListPlayer }) => {
    return (
        // Query based on hosted games vs participant games
        <View style={styles.container}>
            <Text>{sessionListHost}</Text>
            {/* {
                sessionListHost.map((session, index) => {
                    return (
                        <View key={index}>
                            <ActiveGamesItem 
                                session={session.session}
                                playerCount={session.playerCount}
                            />
                        </View>
                    )
                })
            } */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ActiveGamesList;