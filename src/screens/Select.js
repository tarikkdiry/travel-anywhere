import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const SelectScreen = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>Select</Text> 
            </View>
            <View style={styles.bottom}>
                <Button 
                    title="Back"
                    onPress={() => {
                        navigation.pop();
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#03658C' 
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular'
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10%'
    }, 
    bottom: {
        flex: 1,
        // backgroundColor: '#D95A2B'
    }
});

export default SelectScreen;