import {ActivityIndicator, Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {icons} from '../../assets';
import {screenNames} from '../../navigator/screenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      checkLoginStatus();
    }, 800);
  }, []);

  const checkLoginStatus = async () => {
    try {
      // await AsyncStorage.clear();
      const token = await AsyncStorage.getItem('token');
      const loggedIn = await AsyncStorage.getItem('loggedIn');

      if (token && loggedIn === 'true') {
        navigation.reset({
          index: 0,
          routes: [{name: screenNames.Home}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: screenNames.Register}],
        });
      }
    } catch (error) {
      console.error('Error checking AsyncStorage:', error);
      navigation.reset({
        index: 0,
        routes: [{name: screenNames.Register}],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={icons.splashLogo}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={'#E4E4E4'} />
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    </View>
  );
};

export default Splash;
