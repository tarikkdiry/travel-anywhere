import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Dimensions } from 'react-native';
import BackArrow from '../../../../assets/back_arrow.png';
import * as firebase from 'firebase';
import data from '../../../../data/data.json';
import { TouchableOpacity, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import {translate, usePanGestureHandler, withDecay, withOffset, diffClamp} from  "react-native-redash/lib/module/v1";
import Animated, { Extrapolate, interpolate, add } from 'react-native-reanimated';
import LoadingScreen from '../../../components/organisms/LoadingScreen';

//CONSTANTS
import { CARD_HEIGHT } from '../../../components/molecules/Card';

//TESTING
import Card from '../../../components/molecules/Card';

const SoloGame = ({route, navigation}) => {
    const { session, location, topic } = route.params;

    const { height } = Dimensions.get('window');
    const MARGIN = 16;
    // const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;

    const [userSelected, setUserSelected] = useState(false);
    const [containerHeight, setContainerHeight] = useState(height);
    const [isLoading, setIsLoading] = useState(false);

    const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
    const translateX = withDecay({ value: translation.x, velocity: velocity.x, state });
    const visibleCards = Math.floor(containerHeight / CARD_HEIGHT);

    const y = diffClamp(
        withDecay({ 
            value: translation.y, 
            velocity: velocity.y, 
            state,
        }),
        -data.length * CARD_HEIGHT + visibleCards * CARD_HEIGHT, 0
    );


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
                    <View 
                        style={styles.card}
                        onLayout={({
                            nativeEvent: {
                                layout: {
                                    height: h
                                }
                            }
                        }) => setContainerHeight(h)}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <PanGestureHandler {...gestureHandler}>
                            <Animated.View>
                                {data.map((card, index) => {
                                    const positionY = add(y, index * CARD_HEIGHT);
                                    const isDisappearing = -CARD_HEIGHT;
                                    const isOnTop = 0;
                                    const isOnBottom = (visibleCards - 1) * CARD_HEIGHT;
                                    const isAppearing = visibleCards * CARD_HEIGHT;
                                    const extraTranslationY = interpolate(positionY, {
                                        inputRange: [isOnBottom, isAppearing],
                                        outputRange: [0, -CARD_HEIGHT / 8],
                                        extrapolate: Extrapolate.CLAMP
                                    });
                                    const translateY = add(interpolate(y, {
                                        inputRange: [-CARD_HEIGHT * index, 0],
                                        outputRange: [-CARD_HEIGHT * index, 0],
                                        extrapolate: Extrapolate.CLAMP,
                                    }), extraTranslationY);
                                    const scale = interpolate(positionY, {
                                        inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
                                        outputRange: [0.7, 1, 1, 0.7],
                                        extrapolate: Extrapolate.CLAMP
                                    });
                                    const opacity = interpolate(positionY, {
                                        inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
                                        outputRange: [0.8, 1, 1, 0.8],
                                    });
                                    return (
                                            <Animated.View 
                                                style={[
                                                    styles.card, 
                                                    { opacity, transform: [{ translateY }, { scale } ]}
                                                ]}
                                                key={index}
                                            >
                                                <Card 
                                                    key={Math.random().toString()} // Doesn't have to be super secure
                                                    title={card.title}
                                                    description={card.description}
                                                />
                                            </Animated.View>
                                    )
                                })}
                            </Animated.View>
                        </PanGestureHandler>
                        </ScrollView>
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
        ...StyleSheet.absoluteFillObject,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#03588C',
    },
    top: {
        flex: 1,
        padding: 20,
    },
    bottom: {
        flex: 4,
        flexDirection: 'column',
        padding: 20,
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
        marginTop: '20%',
    },
    card: {
        
    }
});

export default SoloGame;