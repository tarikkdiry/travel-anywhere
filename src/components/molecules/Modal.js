import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Modal = ({ session }) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text>Invite Friends!</Text>
                <Text>{session}</Text>
            </View>
            <View style={styles.bottom}>
                <Text>Share this code with your friends and start playing!</Text>
                <Button 
                    title="GOT IT"
                    color="white"
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10,
        height: 50,
        width: '80%'
    },
    top: {
        display: 'flex'
    },
    bottom: {
        display: 'flex'
    }
})