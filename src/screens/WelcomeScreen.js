import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

// API
import { login, signup, signout } from '../api/CardsApi';

const WelcomeScreen = ({ route, navigation }) => {

    onSignedOut = () => {
        console.log('Signed out!');
        navigation.pop(); // REFACTOR with more sophisticated navigation schema
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                activeOpacity={0.1}
                underlayColor="#DDDDDD"
                style={styles.arrow}
                onPress={() => {
                    signout(onSignedOut)
                }}>
            <Image 
                source={BackArrow}
                style={styles.arrow}
            />
            </TouchableOpacity>
            <Text style={styles.text}>Travel Anywhere</Text> 
            <View style={styles.button}> 
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
        backgroundColor: '#D95A2B',
        padding: 20
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular',
        marginTop: '20%',
        padding: 20
    },
    arrow: {
        height: 50,
        width: 50,
        tintColor: 'white',
        marginTop: '20%'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WelcomeScreen;