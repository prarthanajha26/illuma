import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/Home';
import {screenNames} from '../screenName';
import Analysis from '../../screens/Home/Analysis';
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.Home}>
      <Stack.Screen
        name={screenNames.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screenNames.Analysis}
        component={Analysis}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
