import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../../../assets/back_arrow.png';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingScreen from '../../../components/organisms/LoadingScreen';

// Fire Api
// import * as Fire from '../api/FireApi';

const SoloTopicSelectScreen = ({ route, navigation }) => {
    const { location, userEmail } = route.params;

    const [isLoading, setIsLoading] = useState(false);
    const [topic, setTopic] = useState('');
    const placeholderColor = "#808080"; // or #949494

    const createGame = (topic) => {
        createGameHelper(topic);
    };

    const createGameHelper = async (session) => {
        setIsLoading(true);

        try {
            // Create new game session under 'solo/'
            await firebase.database().ref(`solo/${session}`).set({
                hostEmail: userEmail,
                location: location,
                timestamp: Date.now(),
                topic: topic
            }).then(
                console.log('Game session created!'),
                setIsLoading(false)
            )

            navigation.navigate('SoloGame', {
                location: location,
                topic: topic
            });

            setIsLoading(false);

        } catch(err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const topicHandler = (topic) => {
        setTopic(topic);
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
                </View>
                <View style={styles.bottom}>
                    <View style={styles.userInput}>
                        <TouchableOpacity onPress={() => setTopic('Discover')}><Text style={[styles.topicText, {color: '#1B63F2'}]}>Discover</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setTopic('Food')}><Text style={[styles.topicText, {color: '#F20530'}]}>Food</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setTopic('People')}><Text style={[styles.topicText, {color: '#009C6F'}]}>People</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setTopic('Surprise')}><Text style={[styles.topicText, {color: '#F28D77'}]}>...Surprise me?</Text></TouchableOpacity>
                    </View>
                    <View style={styles.continue}>
                        <View style={styles.button}> 
                            <Button 
                                title="Continue"
                                color="white"
                                disabled={(topic.length > 0) ? false: true}
                                onPress={() => {
                                    createGame(generateGameCode(), topic);
                                }}
                            />
                        </View>
                    </View>
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
        backgroundColor: '#023859',
        padding: 20
    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        fontSize: 35, 
        color: 'white', 
        fontFamily: 'regular',
        marginTop: '20%',
        padding: 20
    },
    topicText: {
        display: 'flex',
        fontSize: 30, 
        color: 'white', 
        fontFamily: 'regular',
        // marginTop: '20%',
        padding: 20,
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

export default SoloTopicSelectScreen;