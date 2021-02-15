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

    useEffect(() => {
        // Update the players as they join/ready up
        // Check for all players joined/readied up
        setCurrentPlayer(playerName);

        // if (!players.includes(playerName)) {
        //     setPlayers(currentPlayers => [...currentPlayers, playerName]);
        // };
        seeStates();

        // Listen if game gets deleted
        let game = firebase.database().ref(`games/${session}`);
        game.on('value', (snapshot) => {
            if(snapshot.val() === null && !currentHost) {
                // navigation.navigate('Welcome', {

                // });
                console.log(snapshot);
            };
        });
    })

    const leaveGame = async () => {
        console.log(currentPlayer + ' left the game!');
        if (currentPlayer == currentHost) {
            deleteGame(session);
            console.log(`Session ${session} has ended!`);
            navigation.navigate('Welcome', { 

            });
        } 
        else {
            let waitingPlayer = await firebase.database().ref(`game/${session}/waiting`).once('value');
            const players = Object.values(waitingPlayer.val());
            players.forEach((player) => {
                // console.log(player);
                if (player === currentPlayer) {
                    firebase.database().ref(`game/${session}/waiting`).remove();
                };
            })
        }
    };

    const readyUp = () => {
        // firebase.database().ref(`game/${session}/waiting/${currentPlayer}`).remove();
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
                            // navigation.push('CreateGame', {
                            // leaveGame();
                            // })
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