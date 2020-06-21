import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const WelcomeScreen = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>Travel Anywhere</Text> 
            </View>
            <View style={styles.bottom}>
                <Button 
                    title="Hit me!"
                    color="white"
                    onPress={() => {
                        navigation.push('Select', {

                        })
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
        backgroundColor: '#D95A2B' 
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular'
    },
    top: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10%'
    }, 
    bottom: {
        flex: 1,
        backgroundColor: '#D95A2B'
    }
});

export default WelcomeScreen;