import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {screenNames} from '../screenName';
import Profile from '../../screens/Profile';
import Subscription from '../../screens/Subscription';
import Bookmark from '../../screens/Bookmark';
import HomeNavigation from '../HomeNavigation';
import SubscriptionNav from '../SubscriptionNav';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 80, backgroundColor: '#131313'},
        tabBarActiveTintColor: '#FFBF00',
      }}
      initialRouteName={screenNames.Home}>
      <Tab.Screen
        options={{headerShown: false}}
        name={screenNames.Subscription}
        component={SubscriptionNav}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={screenNames.Bookmark}
        component={Bookmark}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={screenNames.Home}
        component={HomeNavigation}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={screenNames.Profile}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
