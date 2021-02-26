import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const PlayerListItem = ({ name, status }) => {
    return (
        <View style={styles.container}>
            <View style={styles.player}>
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.status}>
                <Text style={styles.text}>{status}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        height: 50,
        paddingHorizontal: 20
    },
    player: {
        color: 'white',
        fontSize: 15
    },
    status: {
        color: 'white'
    },
    text: {
        color: 'white'
    }
});

export default PlayerListItem;