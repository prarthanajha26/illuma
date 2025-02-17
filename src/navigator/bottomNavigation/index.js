import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {screenNames} from '../screenName';
import Bookmark from '../../screens/Bookmark';
import HomeNavigation from '../HomeNavigation';
import SubscriptionNav from '../SubscriptionNav';
import {image} from '../../assets';
import {normalize} from '../../utils/dimension';
import Notification from '../../screens/Notification';
import ProfileNavigator from '../profileNavigator';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 80, backgroundColor: '#131313'},
        tabBarActiveTintColor: '#FFBF00',
        tabBarStyle: {
          height: normalize(70),
          backgroundColor: '#131313',
          paddingTop: normalize(15),
          borderTopWidth: 0,
        },
      }}
      initialRouteName={screenNames.Home}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <Image
              source={image.subscriptionBar}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#FFBF00' : '#FFFFFF',
              }}
            />
          ),
          tabBarLabel: '',
        }}
        name={screenNames.Subscription}
        component={SubscriptionNav}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <Image
              source={image.bookmarkBar}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#FFBF00' : '#FFFFFF',
              }}
            />
          ),
          tabBarLabel: '',
        }}
        name={screenNames.Bookmark}
        component={Bookmark}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <Image
              source={image.homeBar}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#FFBF00' : '#FFFFFF',
              }}
            />
          ),
          tabBarLabel: '',
        }}
        name={screenNames.Home}
        component={HomeNavigation}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <Image
              source={image.activity}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#FFBF00' : '#FFFFFF',
              }}
            />
          ),
          tabBarLabel: '',
        }}
        name={screenNames.Notification}
        component={Notification}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <Image
              source={image.profileBar}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#FFBF00' : '#FFFFFF',
              }}
            />
          ),
          tabBarLabel: '',
        }}
        name={screenNames.Profile}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
