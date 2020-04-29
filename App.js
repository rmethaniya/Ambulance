/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AmbulanceTrack from './src/demo/AmbulanceTrack'
import Setting from './src/demo/Setting'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}
        initialRouteName="AmbulanceTrack">
        <Stack.Screen name="AmbulanceTrack" component={AmbulanceTrack} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;