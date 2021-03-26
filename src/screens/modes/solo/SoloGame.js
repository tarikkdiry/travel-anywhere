import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import BackArrow from '../../../../assets/back_arrow.png';
import * as firebase from 'firebase';
import data from '../../../../data/data.json';
import { TouchableOpacity, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import {translate, usePanGestureHandler, withDecay, withOffset} from  "react-native-redash/lib/module/v1";
import Animated from 'react-native-reanimated';
import LoadingScreen from '../../../components/organisms/LoadingScreen';

//TESTING
import Card from '../../../components/molecules/Card';
import { Dimensions } from 'react-native';

const SoloGame = ({route, navigation}) => {
    const { session, location, topic } = route.params;

    const { height } = Dimensions.get('window');
    const MARGIN = 16;
    // const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;

    const [userSelected, setUserSelected] = useState(false);
    const [containerHeight, setContainerHeight] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
    const translateX = withDecay({ value: translation.x, velocity: velocity.x, state });
    const translateY = withDecay({ value: translation.y, velocity: velocity.y, state, });

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
                                    
                                    return (
                                            <Animated.View 
                                                style={[
                                                    styles.card, 
                                                    { transform: [{ translateY }]}
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
        padding: 20,
    },
    top: {
        flex: 1,
    },
    bottom: {
        flex: 4,
        flexDirection: 'column',
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
        // marginTop: '10%'
        // marginVertical: MARGIN
    }
});

export default SoloGame;