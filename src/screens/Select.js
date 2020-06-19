import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Card from '../components/molecules/Card';

const SelectScreen = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Card 
                title="Card Title"
            />
            <Button 
                title="Back"
                color="white"
                onPress={() => {
                    navigation.pop();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#03658C',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular'
    },
    top: {
        flex: 1,
        padding: '10%'
    }, 
});

export default SelectScreen;