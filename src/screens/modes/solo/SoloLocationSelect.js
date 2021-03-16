import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../../../assets/back_arrow.png';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingScreen from '../../../components/organisms/LoadingScreen';

const SoloLocationSelectScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState('');
    const placeholderColor = "#808080"; // or #949494

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
                    {/* <Text style={styles.text}>Where are we?</Text>  */}
                </View>
                <View style={styles.bottom}>
                    <View style={styles.userInput}>
                        <TextInput 
                            style={styles.input} 
                            // onChangeText={name => setPlayerName(name.toUpperCase())} 
                            value={location}
                            placeholder="Where are we?"
                            placeholderTextColor={placeholderColor}
                            maxLength={7}
                        />
                    </View>
                    <View style={styles.continue}>
                        <View style={styles.button}> 
                            <Button 
                                title="Continue"
                                color="white"
                                onPress={() => {
                                    // joinGame(gameCode, playerName);
                                    navigation.navigate('SoloTopicSelect');
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
        flex: 3,
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

export default SoloLocationSelectScreen;