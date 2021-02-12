import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateGameScreen = ({ route, navigation }) => {
    const [hostName, setHostName] = useState(''); // Potentially use login data
    const [gameCode, setGameCode] = useState('') // Four Character code
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const placeholderColor = "#808080"; // or #949494

    const createGame = (session, name) => {
        let newGameCode = generateGameCode(session);
        // Determine if the new game exists, if not => proceed
        doesGameExist(session) ? createGameHelper(newGameCode, name) : createGameHelper(session, name);
    };

        // Keyboard.dismiss();
        // Check here for valid inputs such as name and (possibly) card pack selection
        // Set isLoading to true to initiate loading screen
        // Create new game in firebase
        // Assign current user to host
        // Set status to waiting in order to have other players join

    const createGameHelper = async (session, name) => {
        try {
            await firebase.database().ref('game/' + session).set({
                playerName: name,
                host: name,
                status: 'lobby',
                timestamp: Date.now(),
                players: 1
            });
            console.log('Game session created!');
            await firebase.database().ref('players/' + session).set({
                playerName: name,
                host: name,
                // status: 'lobby',
                // timestamp: Date.now(),
                // players: 1
            })
            // console.log(`${name} has joined!`)
            .then(
                // Move on to lobby page
                navigation.navigate('Lobby', {
                    session: session,
                    hostName: hostName
                }),
                console.log(`${name} is on their way to the lobby!`)
            )
            setGameCode(session);
        } catch (err) {
            setIsLoading(false);
            console.log("Sorry! Can't create game... -> " + err.message);
            // deleteGame(session);
        }
    }
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

    // Generate random 4 character code for game session creation
    const generateGameCode = () => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let len = characters.length;

        for (let i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * len));
        }

        return result;
    };

    // Move to shared folder
    const deleteGame = (gameCode) => {
        firebase.database().ref('game/' + gameCode).remove();
        firebase.database().ref('players/' + gameCode).remove();
        console.log(`${gameCode} has been removed!`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity 
                    activeOpacity={0.1}
                    underlayColor="#DDDDDD"
                    style={styles.arrow}
                    onPress={() => {
                        deleteGame(gameCode);
                        navigation.pop();
                    }}>
                <Image 
                    source={BackArrow}
                    style={styles.arrow}
                />
                </TouchableOpacity>
            <Text style={styles.text}>Create Game</Text> 
            </View>
            <View style={styles.bottom}>
                <TextInput 
                    style={styles.input} 
                    onChangeText={name => setHostName(name.toUpperCase())} 
                    value={hostName}
                    placeholder="Name"
                    placeholderTextColor={placeholderColor}
                    maxLength={8}
                />
                <View style={styles.button}> 
                    <Button 
                        title="Continue"
                        color="white"
                        // onPress={() => {
                        //     navigation.pop()
                        // }}
                        onPress={() => {
                            createGame(generateGameCode(), hostName.toUpperCase());
                        }}
                    />
                    <Button 
                        title="Reset"
                        color="white"
                        // onPress={() => {
                        //     navigation.pop()
                        // }}
                        onPress={() => {
                            deleteGame(gameCode);
                        }}
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
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
        borderRadius: 10
    }
});

export default CreateGameScreen;