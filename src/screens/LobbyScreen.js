import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

// API
import { login, signup, signout } from '../api/CardsApi';

const LobbyScreen = ({ route, navigation }) => {
    this.db = firebase.database();
    // Route params
    const { session, hostName } = route.params;

    const [currentHost, setCurrentHost] = useState(hostName);
    const [players, setPlayers] = useState([]);
    const [everyoneReady, setEveryoneReady] = useState(false);

    useEffect(() => {
        // Update the players as they join/ready up
        // Check for all players joined/readied up
    })

    onSignedOut = () => {
        console.log('Signed out!');
        navigation.push('Login'); ;// REFACTOR 
    };

    // Move to shared folder
    const deleteGame = (gameCode) => {
        this.db.ref('game/' + gameCode).remove();
        this.db.ref('players/' + gameCode).remove();
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity 
                    activeOpacity={0.1}
                    underlayColor="#DDDDDD"
                    style={styles.arrow}
                    onPress={() => {
                        deleteGame(session);
                        navigation.navigate('Welcome');
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