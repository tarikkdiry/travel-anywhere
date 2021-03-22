import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingScreen from '../components/organisms/LoadingScreen';
import * as firebase from 'firebase';
import BackArrow from '../../assets/back_arrow.png';

//TESTING
import ActiveGamesItem from '../components/atoms/ActiveGamesItem';
import ActiveGamesMenu from '../components/organisms/ActiveGamesMenu';
import ActiveGamesList from '../components/molecules/ActiveGamesList';

const ActiveGames = ({ route, navigation }) => {
    const { userEmail } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [playerCount, setPlayerCount] = useState('');
    const [sessionDetailsHosting, setSessionDetailsHosting] = useState([]);
    const [sessionDetailsPlayer, setSessionDetailsPlayer] = useState([]);
    const [isHosting, setIsHosting] = useState(false);

    // Firebase refs
    const gameRef = firebase.database().ref(`game`);
    const playerRef = firebase.database().ref(`players`);

    useEffect(() => {
        const getActiveHostedGames = gameRef.on('value', (snapshot) => {
            try {
                let hostedSessions = [];
                snapshot.forEach((child) => {
                    if (child.val().hostEmail === userEmail) {
                        let sessionId = child.key;
                        let pCount = child.val().playerCount;
                        hostedSessions.push([sessionId, pCount]);
                    }
                });

                // Ensure the state is only updated once and only when there is an update
                if (JSON.stringify(sessionDetailsHosting) !== JSON.stringify(hostedSessions)) {
                    setSessionDetailsHosting(hostedSessions);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        });

        // TODO
        // Refactor to something more efficient
        const getActivePlayerGames = playerRef.on('value', (snapshot) => {
            try {
                let playerSessions = [];
                snapshot.forEach((child) => {
                    child.forEach((baby) => {
                        let sessionId = child.key;
                        let pVal = baby.val();
                        // Passing name as count for now
                        // MUST REFACTOR
                        let pName = "as: " + baby.val().playerName;
                        if (pVal.playerEmail === userEmail && pVal.role === 'Player') {
                            playerSessions.push([sessionId, pName]);
                        }
                    })
                });
                
                // Ensure the state is only updated once and only when there is an update
                if (JSON.stringify(sessionDetailsPlayer) !== JSON.stringify(playerSessions)) {
                    setSessionDetailsPlayer(playerSessions);
                }
            } catch(err) {

            }
        });

        return () => {
            gameRef.off('value', getActiveHostedGames);
            playerRef.off('value', getActivePlayerGames);
        }
    });

    // Switch render based on user selection for games hosting vs participating in
    const switchModeHandler = (status) => {
        setIsHosting(status);
    };

    return (
        <>
            {!isLoading ? (
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
                        <Text style={styles.title}>Active Games</Text> 
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.menu}>
                            <TouchableOpacity onPress={() => switchModeHandler(false)}>
                                <Text style={isHosting ? styles.text : styles.activeText}>Active</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => switchModeHandler(true)}>
                                <Text style={isHosting ? styles.activeText : styles.text}>Hosting</Text>
                            </TouchableOpacity>
                        </View>
                        <ActiveGamesList selection={isHosting} sessionListHost={sessionDetailsHosting} sessionListPlayer={sessionDetailsPlayer}/>
                    </View>
                </View> ) : (
                    <LoadingScreen 
                        text="Loading..."
                    />
                )
            }
        </>
    );
}

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
        paddingHorizontal: '5%'
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: 'white', 
        fontFamily: 'regular',
        borderBottomColor: 'white',
        paddingBottom: 50,
    },
    title: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular',
        marginTop: '20%',
        padding: 20
    },
    text: {
        color: 'gray',
        fontSize: 25,
        fontFamily: 'regular',
    },
    activeText: {
        // color: '#F28D77',
        color: '#F28D77',
        fontSize: 25,
        fontFamily: 'regular',
    },
    arrow: {
        height: 50,
        width: 50,
        tintColor: 'white',
        marginTop: '20%'
    },
    userInput: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start'
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
    continue: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '10%'
    },
    button: {
        width: '50%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20
    }
});

export default ActiveGames;