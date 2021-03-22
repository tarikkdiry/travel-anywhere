import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SoloGame = ({route, navigation}) => {
    const { location, topic } = route.params;
    return (
        <>
            <View style={styles.container}>
                <Text>{location}</Text>
                <Text>{topic}</Text>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#03588C',
        padding: 20
    },
});

export default SoloGame;