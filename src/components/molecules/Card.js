import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions } from 'react-native';
import CardFront from '../atoms/CardFront';
import CardBack from '../atoms/CardBack';

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.9;
export const CARD_HEIGHT = CARD_WIDTH * ratio

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelected: false
        };
    }

    // DEPRECATED, REFACTOR SOON
    UNSAFE_componentWillMount() {
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

    flipCard() {
        // if (this.value >= 90) {
        //     Animated.spring(this.animatedValue, {
        //         toValue: 0,
        //         friction: 8,
        //         tension: 10
        //     }).start();
        // } else {
        //     Animated.spring(this.animatedValue, {
        //         toValue: 180,
        //         friction: 8,
        //         tension: 10
        //     }).start();
        // }
        Animated.spring(this.animatedValue, {
            toValue: 180,
            friction: 8,
            tension: 10
        }).start();
    }

    checkSelected() { // set card's flip state as flipped
        this.setState({ userSelected: true})
    }

    render() {

        const frontAnimatedStyle = { // rotate
            transform: [
                { rotateX: this.frontInterpolate }
            ]
        }

        const backAnimatedStyle = { // rotate back
            transform: [
                { rotateX: this.backInterpolate }
            ]
        }

        return (
            <TouchableOpacity 
                onPress={() => {
                    if (this.state.userSelected == false) {
                        this.flipCard(); // perform the flip
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
    }
}

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
        width: CARD_WIDTH,
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

export default Card;