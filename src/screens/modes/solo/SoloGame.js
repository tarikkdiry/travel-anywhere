import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Dimensions } from 'react-native';
import HomeIcon from '../../../../assets/home.png';
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
import NewCard from '../../../components/molecules/NewCard';

const SoloGame = ({route, navigation}) => {
    const { session, location, topic } = route.params;
    const { height } = Dimensions.get('window');
    const [containerHeight, setContainerHeight] = useState(height);
    const [isLoading, setIsLoading] = useState(false);
    const MARGIN = 16;
    // const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;

    // GAME STATES
    const [isSelectMode, setIsSelectMode] = useState(true);

    // CARD STATES
    const [userSelected, setUserSelected] = useState(false);
    const [selectedCard, setSelectedCard] = useState();

    // REMAINING AVAILABLE CARDS
    // MAY NEED TO UPDATE IN DATABASE
    const [availableCards, setAvailableCards] = useState(data);

    // ANIMATIONS
    const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
    const translateX = withDecay({ value: translation.x, velocity: velocity.x, state });
    const visibleCards = Math.floor(containerHeight / CARD_HEIGHT);

    useEffect(() => {
        // if (!isSelectMode) {
        //     console.log('Selected!');
        //     setIsSelectMode(true);
        // }
    })

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
    
    const onSelect = (id) => {
        // setSelectedCard(id); // THE ISSUE IS HERE, CARDS WONT FLIP ON FIRST TAP
        console.log('Selected: ' + id);
        let newDeck = [];

        availableCards.map((item) => {
            console.log('=======Item!=======');
            if (item.id !== id) { // REFACTOR: Exclude ALL previously selected cards
                console.log(item) 
            }
            // console.log(item);
        });
    };

    return (
        <>
        {!isLoading ? (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity 
                        activeOpacity={0.1}
                        underlayColor="#DDDDDD"
                        // style={styles.home}
                        onPress={() => {
                            // deleteGame(session);
                            navigation.navigate('Welcome')
                        }}>
                    <Image 
                        source={HomeIcon}
                        style={styles.home}
                    />
                    </TouchableOpacity>
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
                                    const isOnTop = CARD_HEIGHT;
                                    const isOnBottom = (visibleCards - 1) * CARD_HEIGHT;
                                    const isAppearing = (visibleCards + 1) * CARD_HEIGHT;
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
                                        outputRange: [0.5, 1, 1, 0.5],
                                        extrapolate: Extrapolate.CLAMP
                                    });
                                    const opacity = interpolate(positionY, {
                                        inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
                                        outputRange: [0.5, 1, 1, 0.5],
                                    });
                                    return (
                                            <Animated.View 
                                                style={[
                                                    styles.card, 
                                                    { opacity, transform: [{ translateY }, { scale } ]},
                                                    
                                                ]}
                                                key={index}
                                                onPress={() => setIsSelectMode(false)}
                                            >
                                                <Card 
                                                    key={Math.random()} // Doesn't have to be super secure
                                                    id={card.id}
                                                    title={card.title}
                                                    description={card.description}
                                                    onSelect={onSelect}
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
        paddingTop: 20,
        position: 'absolute'
    },
    top: {
        flex: 1,
        zIndex: 100,
        position: 'absolute',
        paddingHorizontal: 20,
        // paddingTop: '90%',
    },
    bottom: {
        flex: 4,
        zIndex: 0,
        // position: 'absolute',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        // paddingHorizontal: '10%'
        // justifyContent: 'center'
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular',
        marginTop: '20%',
        padding: 20
    },
    home: {
        height: 70,
        width: 70,
        tintColor: 'white',
        marginTop: '130%',
        // zIndex: 100
    },
    card: {
        
    }
});

export default SoloGame;