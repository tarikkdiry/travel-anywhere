import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import CardFront from '../atoms/CardFront';
import CardBack from '../atoms/CardBack';

// const Card = ({ title, description }) => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.flipCard}>
//                 <View style={styles.title}>
//                     <Title 
//                         title={title}
//                     />
//                 </View>
//             </View>

//             <View style={[styles.flipCard, styles.flipCardBack]}>
//                 <View style={styles.title}>
//                     <Title 
//                         title={title}
//                     />
//                 </View>
//                 <View style={styles.description}>
//                     <Description
//                         description={description}
//                     />
//                 </View>
//             </View>
//         </View>
//     )
// };

class Card extends Component {
    constructor(props) {
        super(props);
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

    render() {
        const frontAnimatedStyle = {
            transform: [
                { rotateX: this.frontInterpolate }
            ]
        }

        const backAnimatedStyle = {
            transform: [
                { rotateX: this.backInterpolate }
            ]
        }

        return (
            <TouchableOpacity onPress={() => this.flipCard()}>
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
    },
    description: {
        marginTop: 20
    },
    flipCard: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        position: 'absolute',
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
        // alignItems: 'center',
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