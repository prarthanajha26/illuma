import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import {screenNames} from './screenName';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import Register from '../screens/Register';
import BottomNavigation from './bottomNavigation';
const Stack = createNativeStackNavigator();

const rootnavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={screenNames.Splash}>
        <Stack.Screen
          name={screenNames.Splash}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screenNames.Home}
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screenNames.Login}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screenNames.Register}
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default rootnavigation;

const styles = StyleSheet.create({});
