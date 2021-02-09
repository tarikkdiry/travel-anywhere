import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const JoinGameScreen = ({ route, navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [gameCode, setGameCode]  = useState('');
    const [error, setError] = useState('');
    const placeholderColor = "#808080"; // or #949494

    const joinGame = (session, name) => {
        firebase.database().ref('players/' + session).set({
            playerName: name,
            host: name,
            status: 'lobby',
            timestamp: Date.now(),
            players: 1
        });
    };

    const canJoinGame = (session) => {
        console.log('Skrrt Skrrrrrrrt Skrttttttttt ;)');
        try {
            if (!doesGameExist(session)) {
                console.log(`Game ${session} does not exist!`);
                setIsLoading(false);
                setError('Sorry, this game does not exist. :(');
                return false;
            } 
            // Check here if the game is in session. If so, don't allow entry
            setIsLoading(true);
            return true;
        } catch {
            console.log(`Oh no! Can't find ${session} :(`);
            setIsLoading(false);
            return false;
        }
    };

    // Check if game session exists and is active
    const doesGameExist = (session) => {
        firebase.database().ref('game/' + session).once('value', snapshot => {
            if (snapshot.exists()) {
                return true;
            } else {
                return false;
            }
        })
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity 
                    activeOpacity={0.1}
                    underlayColor="#DDDDDD"
                    style={styles.arrow}
                    onPress={() => {
                        navigation.pop()
                    }}>
                <Image 
                    source={BackArrow}
                    style={styles.arrow}
                />
                </TouchableOpacity>
                <Text style={styles.text}>Join Game</Text> 
            </View>
            <View style={styles.bottom}>
                <TextInput 
                    style={styles.input} 
                    onChangeText={name => setPlayerName(name.toUpperCase())} 
                    value={playerName}
                    placeholder="Name"
                    placeholderTextColor={placeholderColor}
                    maxLength={8}
                />
                <TextInput 
                    style={styles.input} 
                    onChangeText={code => setGameCode(code.toUpperCase())} 
                    value={gameCode}
                    placeholder="Game Code"
                    placeholderTextColor={placeholderColor}
                    maxLength={4}
                />
                <View style={styles.button}> 
                    <Button 
                        title="Continue"
                        color="white"
                        onPress={() => {
                            joinGame(gameCode, playerName);
                        }}
                    />
                </View>
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#023859',
        padding: 20
    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start'
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
    input: {
        height: 60,
        borderColor: 'white',
        borderBottomWidth: 0.2,
        color: 'white',
        marginVertical: 15,
        fontSize: 30,
        fontFamily: 'regular',
    },
    button: {
        width: '50%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20
    }
});

export default JoinGameScreen;