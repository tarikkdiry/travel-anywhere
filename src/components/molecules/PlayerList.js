import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import PlayerListItem from '../atoms/PlayerListItem';

const PlayerList = ({ players }) => {

    useEffect(() => {

    });

    return (
        <View style={styles.container}>
            {
                players.map((player, index) => {
                    return(
                        <View key={index} style={styles.item}>
                            <PlayerListItem 
                                name={player.value}
                                status="Waiting"
                            />
                        </View>
                    )
                })
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    item: {
        paddingTop: 40,
    }
});

export default PlayerList;