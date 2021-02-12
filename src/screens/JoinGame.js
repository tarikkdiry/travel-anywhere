import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/organisms/LoadingScreen';

const JoinGameScreen = ({ route, navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [gameCode, setGameCode]  = useState('');
    const [error, setError] = useState('');
    const placeholderColor = "#808080"; // or #949494

    useEffect(() => {
        return() => {
            setPlayerName('');
            setIsLoading(false);
            setError('');
        }
    }, []);

    // STILL CREATING A NEW PLAYER SESSION EVEN WITH NO GAME
    const joinGame = async (session, name) => {
        if (name.length < 1) {
            console.log('You must enter a name!');
            setError('You must enter a name!');
            return;
        }

        if (session.length < 4) {
            console.log('You must enter a proper, 4 character code!');
            setError('You must enter a proper, 4 character code!');
            return;
        }
        try {
            if (await canJoinGame(session)) {
                console.log(`${name} is joining the game!`);
                firebase.database().ref('players/' + session).set({
                    playerName: name,
                    host: name,
                    status: 'lobby',
                    // timestamp: Date.now(),
                    // players: 1
                }).then(
                    navigation.navigate('Lobby', {
                        
                    })
                );
            }  
            firebase.database().ref('players/' + session).set({
                playerName: name,
                host: name,
                status: 'lobby',
                // timestamp: Date.now(),
                // players: 1
            }).then(
                navigation.navigate('Lobby', {
                    
                })
            );
        } catch(err) {

        }
    };

    const canJoinGame = async (session) => {
        console.log('Checking if the game is joinable...');
        try {
            let snapshot = await firebase.database().ref(`game`).orderByKey().equalTo(session).once('value');
            if(snapshot.val() == null) {
                setIsLoading(false);
                setError('This game cannot be joined. :(');
                return false;
            } 
            console.log('Game found!');
            setIsLoading(true);
            return true;
        } catch {
            console.log('Could not check if the game exists. :(');
            setIsLoading(false);
            return false;
        }
    };

    const leaveGame = async (session, name) => {
        return;
    }

    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <View>
                        <Loading text="Loading Game!"/>
                    </View> 
                ) : (
                    <View style={styles.container}>
                        <View style={styles.top}>
                            <TouchableOpacity 
                                activeOpacity={0.1}
                                underlayColor="#DDDDDD"
                                style={styles.arrow}
                                onPress={() => {
                                    leaveGame(gameCode, playerName);
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
                )}
        </View>
        // <View style={styles.container}>
        //     <View style={styles.top}>
        //         <TouchableOpacity 
        //             activeOpacity={0.1}
        //             underlayColor="#DDDDDD"
        //             style={styles.arrow}
        //             onPress={() => {
        //                 navigation.pop()
        //             }}>
        //         <Image 
        //             source={BackArrow}
        //             style={styles.arrow}
        //         />
        //         </TouchableOpacity>
        //         <Text style={styles.text}>Join Game</Text> 
        //     </View>
        //     <View style={styles.bottom}>
        //         <TextInput 
        //             style={styles.input} 
        //             onChangeText={name => setPlayerName(name.toUpperCase())} 
        //             value={playerName}
        //             placeholder="Name"
        //             placeholderTextColor={placeholderColor}
        //             maxLength={8}
        //         />
        //         <TextInput 
        //             style={styles.input} 
        //             onChangeText={code => setGameCode(code.toUpperCase())} 
        //             value={gameCode}
        //             placeholder="Game Code"
        //             placeholderTextColor={placeholderColor}
        //             maxLength={4}
        //         />
        //         <View style={styles.button}> 
        //             <Button 
        //                 title="Continue"
        //                 color="white"
        //                 onPress={() => {
        //                     joinGame(gameCode, playerName);
        //                 }}
        //             />
        //         </View>
        //         </View>
        // </View>
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