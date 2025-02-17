import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from '../screenName';
import ProfileScreen from '../../screens/Profile';
import EditProfile from '../../screens/Profile/EditProfile';
import DeleteAccountScreen from '../../screens/Profile/DeleteAccount';
import ChangePasswordScreen from '../../screens/Profile/changePassword';
const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.Profile}>
      <Stack.Screen
        name={screenNames.Profile}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screenNames.EditProfile}
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screenNames.DeleteAccount}
        component={DeleteAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screenNames.ChangePassword}
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
