import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingScreen from '../components/organisms/LoadingScreen';
import * as firebase from 'firebase';
import BackArrow from '../../assets/back_arrow.png';

//TESTING
import ActiveGamesItem from '../components/atoms/ActiveGamesItem';
import ActiveGamesList from '../components/molecules/ActiveGamesList';

const ActiveGames = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playerCount, setPlayerCount] = useState('');
    const [sessionDetailsHosting, setSessionDetailsHosting] = useState([{session: '', playerCount: ''}]);
    const [sessionDetailsPlayer, setSessionDetailsPlayer] = useState([{session: '', playerCount: ''}]);

    const { userEmail } = route.params;
    const gameRef = firebase.database().ref(`game`);
    // const playerRef = firebase.database().ref(`players`);

    useEffect(() => {
        
        // getPlayerCount('WPLH');

        // REFACTOR: 
        // Build each object step by step and push to state array of objects
        // Push state array to ActiveGamesList component
        // Set isLoading to false
        const getActiveGames = gameRef.on('value', (snapshot) => {
            const fetchedHostedGames = [];
            const fetchedPlayerGames = [];

            const fetchedSession = '';
            const fetchedPlayerCount = '';


            snapshot.forEach((child) => {
                if(child.val().hostEmail == userEmail) {
                    fetchedHostedGames.push({
                        session: child.key,
                        playerCount: getPlayerCount(child.key)
                    })
                    // sessionDetailsHosting.push(fetchedHostedGames);
                    console.log('Fetched Hosted Games: ' + fetchedHostedGames);
                }
            })
        })

    });


    // Get Player count based on requested session name
    const getPlayerCount = async (session) => {
        let playerRef = firebase.database().ref(`players/${session}`);
        playerRef.on('value', (snapshot) => {
            console.log(snapshot.numChildren());
            setPlayerCount(snapshot.numChildren())
        })
    }

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
                        <Text style={styles.text}>Active Games</Text> 
                    </View>
                    <View style={styles.bottom}>
                        <Text>Host vs. Guest</Text>
                        <ActiveGamesList sessionListHost={sessionDetailsHosting}/>
                        
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
        // alignItems: 'center',
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