import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../../../assets/back_arrow.png';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingScreen from '../../../components/organisms/LoadingScreen';

//TESTING
import Card from '../../../components/molecules/Card';

const SoloGame = ({route, navigation}) => {
    const { session, location, topic } = route.params;

    const [isLoading, setIsLoading] = useState(false);

    const deleteGame = (session) => {
        firebase.database().ref('solo/' + session).remove();
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
                            deleteGame(session);
                            navigation.pop()
                        }}>
                    <Image 
                        source={BackArrow}
                        style={styles.arrow}
                    />
                    </TouchableOpacity>
                    {/* <Text style={styles.text}>Join Game</Text>  */}
                </View>
                <View style={styles.bottom}>
                    <Card/>
                    {/* <View style={styles.userInput}>
                        <TextInput 
                            style={styles.input} 
                            onChangeText={name => setPlayerName(name.toUpperCase())} 
                            value={playerName}
                            placeholder="Name"
                            placeholderTextColor={placeholderColor}
                            maxLength={7}
                        />
                        <TextInput 
                            style={styles.input} 
                            onChangeText={code => setGameCode(code.toUpperCase())} 
                            value={gameCode}
                            placeholder="Game Code"
                            placeholderTextColor={placeholderColor}
                            maxLength={4}
                        />
                    </View>
                    <View style={styles.continue}>
                        <View style={styles.button}> 
                            <Button 
                                title="Continue"
                                color="white"
                                onPress={() => {
                                    joinGame(gameCode, playerName);
                                }}
                            />
                        </View>
                    </View> */}
                </View>
            </View>
            ) : (
                <LoadingScreen 
                    text="Joining..."
                />
            )
        }
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#03588C',
        padding: 20
    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 3,
        flexDirection: 'column',
        // justifyContent: 'center',
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
});

export default SoloGame;