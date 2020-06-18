import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03658C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
