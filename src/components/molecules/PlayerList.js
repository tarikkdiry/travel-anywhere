import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const PlayerList = ({ players }) => {
    return (
        <View style={styles.container}>
            {
                players.map((player, index) => {
                    return(
                        <View key={index}>
                            <Text style={{color: 'white', fontSize: 30}}>{player["value"]}</Text>
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
        flexDirection: 'column',
    }
});

export default PlayerList;