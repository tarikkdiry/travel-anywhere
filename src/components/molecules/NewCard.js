import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import CardFront from '../atoms/CardFront';
import CardBack from '../atoms/CardBack';

const NewCard = () => {
    const [isFlipped, setIsFlipped] = useState();

    useEffect(() => {

        if (!isFlipped) {
            this.animatedValue = new Animated.Value(0);
            this.value = 0;
            this.animatedValue.addListener(({ value }) => {
                this.value = value;
            })
            this.frontInterpolate = this.animatedValue.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '180deg'],
            });
            this.backInterpolate = this.animatedValue.interpolate({
                inputRange: [0, 180],
                outputRange: ['180deg', '360deg']
            })
        }
        
    }, []);

    const flip = () => {
        Animated.spring(this.animatedValue, {
            toValue: 180,
            friction: 8,
            tension: 10
        }).start();
        setIsFlipped(true);
    };

    const frontAnimatedStyle = { // rotate
        transform: [
            { rotateX: frontInterpolate }
        ]
    };

    const backAnimatedStyle = { // rotate back
        transform: [
            { rotateX: backInterpolate }
        ]
    };

    return (
        <TouchableOpacity 
            onPress={() => {
                if (this.state.userSelected == false) {
                    flip(); // perform the flip
                    this.checkSelected(); // mark this card as flipped already
                }
            }}>
            <View style={styles.container}>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <CardFront/>
                    </Animated.View>

                    <Animated.View style={[backAnimatedStyle, styles.flipCardBack]}>
                        <CardBack 
                            title={this.props.title}
                            description={this.props.description}
                        />
                    </Animated.View>
                </View>
            </View>
        </TouchableOpacity> 
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    description: {
        marginTop: 20
    },
    flipCard: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        // position: 'absolute', // USE THIS TO CREATE CARD STACK VIEW
        backfaceVisibility: 'hidden',
        backgroundColor: '#F2913D',
        height: 200,
        width: '100%',
        borderRadius: 15,
        borderTopWidth: 15,
        borderTopColor: '#F2913D',
        padding: 25,
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        elevation: 1
    },
    flipCardBack: {
        top: 0,
        position: 'absolute',
        backfaceVisibility: 'hidden',
        backgroundColor: '#F0F0F2',
        height: 200,
        width: '100%',
        borderRadius: 15,
        borderTopWidth: 15,
        borderTopColor: '#F2913D',
        padding: 25,
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        elevation: 1
    }
});

export default NewCard;