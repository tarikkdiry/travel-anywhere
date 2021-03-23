import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// export const cardMessages = [
//     "What's it going to be?",
//     "Are you ready?",
//     "Flip me!",
//     "Fun, right?",
//     "Adventure!",
//     ":)"
// ];

export const cardMessageGenerate = () => {
    const length = cardMessages.length;
    const randNum = Math.floor(Math.random() * length);
    return cardMessages[randNum];
};

const CardFront = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {/* {cardMessageGenerate()} */}
                Allez!
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontSize: 35,
        fontFamily: 'regular',
        color: '#03658C'
    }
});

export default CardFront;