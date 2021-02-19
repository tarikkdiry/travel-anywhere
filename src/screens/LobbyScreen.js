import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

// API
import { login, signup, signout } from '../api/CardsApi';

const LobbyScreen = ({ route, navigation }) => {
    // Route params
    const { session, hostName, playerName } = route.params;

    const [currentHost, setCurrentHost] = useState(hostName);
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(playerName);
    const [everyoneReady, setEveryoneReady] = useState(false);
    // const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setCurrentPlayer(playerName);

        // Grab host player
        let host = firebase.database().ref(`game/${session}`).once('value', (snapshot) => {
            setCurrentHost(snapshot.val().host);
        })
        
        // Test how useEffect hook works
        let testCDM = () => {
            console.log("Here!");
        }
        // setCurrentHost(host);

        // Listen for if waiting is empty, or if players length == ready length
        // Update everyoneReady to true and navigate to Game


        // Listen if host leaves/game ends
        // End game and navigate to popToTop

       
        seeStates();
    });

    // TODO: REFACTOR
    // Idea: Same player ID for both /players and /game
    const leaveGame = async () => {
        if (currentPlayer == currentHost) {
            deleteGame(session);
            console.log(`Session ${session} has ended!`);
            navigation.navigate('Welcome');
        } else {
            // waiting
            let waitingPlayers = await firebase.database().ref(`game/${session}/waiting`).once('value');
            let waitingPlayersObj = waitingPlayers.val();
            const waitingIDs = Object.keys(waitingPlayersObj);
            waitingIDs.forEach((ID) => {
                if (waitingPlayersObj[ID] == playerName) {
                    try {
                        firebase.database().ref(`game/${session}/waiting/${ID}`).remove();
                    } catch(err) {
                        console.log(`Can't leave the game: ${err}`);
                    }
                };
            });

            // players
            let activePlayers = await firebase.database().ref(`players/${session}`).once('value');
            let activePlayersObj = activePlayers.val();
            const activeIDs = Object.keys(activePlayersObj);
            activeIDs.forEach((ID) => {
                if (activePlayersObj[ID] == playerName) {
                    try {
                        firebase.database().ref(`players/${session}/${ID}`).remove()
                        .then(
                            console.log(`Player: ${playerName} has left!`)
                        )
                    } catch(err) {
                        console.log(`Can't leave the game: ${err}`);
                    }                    
                };
                navigation.navigate('Welcome');
            });
        }
    };

    const readyUp = async () => {
        let waitingPlayers = await firebase.database().ref(`game/${session}/waiting`).once('value');
        let waitingPlayersObj = waitingPlayers.val();
        const waitingIDs = Object.keys(waitingPlayersObj);
        waitingIDs.forEach((ID) => {
            if (waitingPlayersObj[ID] == playerName) {
                try {
                    firebase.database().ref(`game/${session}/waiting/${ID}`).remove();
                } catch(err) {
                    console.log(`Can't ready up: ${err}`);
                }
            };
        });
        console.log(`${playerName} is ready!`);
    };

    // Move to shared folder
    const deleteGame = (gameCode) => {
        firebase.database().ref('game/' + gameCode).remove();
        firebase.database().ref('players/' + gameCode).remove();
    };

    const seeStates = () => {
        console.log("Session: " + session);
        console.log("Current Host: " + currentHost);
        console.log("Current player: " + currentPlayer);
        // console.log("Current player key: " + currentPlayerKey);
        console.log("Players: " + players);
        console.log("Everyone ready: " + everyoneReady);
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity 
                    activeOpacity={0.1}
                    underlayColor="#DDDDDD"
                    style={styles.arrow}
                    onPress={() => {
                        leaveGame()
                    }}>
                <Image 
                    source={BackArrow}
                    style={styles.arrow}
                />
                </TouchableOpacity>
                <Text style={styles.text}>{"Session:"}</Text> 
                <Text style={styles.session}>{session}</Text> 
            </View>
            <View style={styles.bottom}>
                <View style={styles.buttons}> 
                    <Button 
                        title="READY"
                        style={styles.button}
                        color="white"
                        onPress={() => {
                            readyUp();
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2913D',
        padding: 20
    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular',
        marginTop: '20%',
        paddingLeft: 20
    },
    session: {
        fontSize: 60, 
        color: '#D95A2B', 
        fontFamily: 'regular',
        paddingLeft: 20
    },
    arrow: {
        height: 50,
        width: 50,
        tintColor: 'white',
        marginTop: '20%'
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // height: 30,
        // backgroundColor: 'blue'
    },
    button: {
        
    }
});

export default LobbyScreen;