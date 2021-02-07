import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const JoinGameScreen = ({ route, navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [gameCode, setGameCode]  = useState('');
    const placeholderColor = "#808080"; // or #949494

    return (
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
                <Text style={styles.text}>Join Game</Text> 
            </View>
            <View style={styles.bottom}>
                <TextInput 
                    style={styles.input} 
                    onChangeText={name => setPlayerName(name)} 
                    value={playerName}
                    placeholder="Name"
                    placeholderTextColor={placeholderColor}
                    maxLength={8}
                />
                <TextInput 
                    style={styles.input} 
                    onChangeText={code => setGameCode(code)} 
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
                            navigation.pop()
                        }}
                    />
                </View>
                </View>
        </View>
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
        borderRadius: 10
    }
});

export default JoinGameScreen;