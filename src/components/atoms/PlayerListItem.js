import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const PlayerListItem = ({ name, status }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    }
});

export default PlayerListItem;