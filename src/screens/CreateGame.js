import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import BackArrow from '../../assets/back_arrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateGameScreen = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
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
            <Text style={styles.text}>Create Game</Text> 
            <View style={styles.button}> 
                <Button 
                    title="Back!"
                    color="white"
                    onPress={() => {
                        navigation.pop()
                    }}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#023859',
        padding: 20
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
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CreateGameScreen;