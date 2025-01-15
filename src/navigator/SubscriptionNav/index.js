import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/Home';
import {screenNames} from '../screenName';
import Analysis from '../../screens/Home/Analysis';
import SubscriptionScreen from '../../screens/Subscription';
import ManagePlanScreen from '../../screens/Subscription/ManagePlan';
const Stack = createNativeStackNavigator();

const SubscriptionNav = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.Subscription}>
      <Stack.Screen
        name={screenNames.Subscription}
        component={SubscriptionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screenNames.ManagePlan}
        component={ManagePlanScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SubscriptionNav;

const styles = StyleSheet.create({});
