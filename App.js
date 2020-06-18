import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// EXPO
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import WelcomeScreen from './src/screens/Welcome';
import SelectScreen from './src/screens/Select';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // FETCH FONTS
  const fetchFonts = () => {
    return Font.loadAsync({
      'bold': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'regular': require('./assets/fonts/Montserrat/Montserrat-Black.ttf'),
    });
  };

  if (!fontsLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
      >
        <Stack.Screen 
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Select"
          component={SelectScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
