import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {normalize} from '../../utils/dimension';
import {fonts, image} from '../../assets';
import ButtonArrow from '../../components/ButtonArrow';
import {screenNames} from '../../navigator/screenName';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDataRequest} from '../../redux/action/getUserdata';
import {useFocusEffect} from '@react-navigation/native';
import ProgressBar from '../../components/ProgressBar';
import {fetchSubscriptionRequest} from '../../redux/action/subscriptionAction';
import capitalizeNames from '../../utils/commonFunction';
import {updateNewsletter} from '../../redux/action/editprofileAction';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {logout} from '../../redux/action/logout';

const ProfileScreen = ({navigation}) => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const {userData, userDataloading} = useSelector(state => state.getUserData);

  const {data, error} = useSelector(state => state.subscription);

  const getToken = async () => {
    try {
      const result = await AsyncStorage.getItem('token');
      setProfileData(JSON.parse(result));
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '609450172227-0577jbp72hnevclbql3a5rp6ppr1an71.apps.googleusercontent.com',
    });
  });
  const handleLogout = async () => {
    try {
      const googleUser = GoogleSignin.getCurrentUser();
      if (googleUser) {
        await GoogleSignin.signOut();
        console.log('User signed out from Google');
      } else {
        const firebaseUser = auth().currentUser;
        if (firebaseUser) {
          await auth().signOut();
          console.log('User signed out from Firebase');
        }
      }

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('loggedIn');
      dispatch({type: 'CLEAR_BOOKMARK_DATA'});
      dispatch({type: 'CLEAR_ACTIVITY_DATA'});
      navigation.replace(screenNames.Login);
    } catch (error) {
      console.error('Error during sign out:', error);
      Alert.alert('Error', 'Something went wrong while logging out!');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (profileData?.data?.user?.email) {
        dispatch(getUserDataRequest(profileData?.data?.user?.email));
        dispatch(fetchSubscriptionRequest());
      }
    }, [profileData, dispatch]),
  );

  const currentPlan = data?.data[userData?.data?.subscription?.id];

  const handleNewsSubscribe = () => {
    dispatch(
      updateNewsletter({
        email: profileData?.data?.user?.email,
        status: isSubscribed,
      }),
    );
    setIsSubscribed(prev => !prev);
  };

  // const handleNotificationEnabled = () => {
  //   dispatch(
  //     updateNotification({
  //       email: profileData?.data?.user?.email,
  //       status: !notificationsEnabled,
  //     }),
  //   );
  //   setNotificationsEnabled(prev => !prev);
  // };

  return (
    <SafeAreaView style={styles.container}>
      {userDataloading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="small"
          color="#fff"
        />
      ) : (
        <ScrollView
          bounces={true}
          refreshControl={
            <RefreshControl
              refreshing={userDataloading}
              onRefresh={() => {
                if (profileData?.data?.user?.email) {
                  dispatch(getUserDataRequest(profileData?.data?.user?.email));
                  dispatch(fetchSubscriptionRequest());
                }
              }}
            />
          }
          style={{paddingHorizontal: 25, flex: 1, marginTop: normalize(30)}}>
          <View style={styles.profileSection}>
            <Image
              style={styles.avatar}
              source={
                !userData?.data?.profile_image_url
                  ? image.dummyProfile
                  : {
                      uri: `data:image/jpeg;base64,${userData?.data?.profile_image_url}`,
                    }
              }
            />
            <Text style={styles.name}>
              {capitalizeNames(
                userData?.data?.name
                  ? userData?.data?.name
                  : profileData?.data?.user?.givenName,
              )}
            </Text>
            <Text style={styles.username}>
              {userData?.data?.email
                ? userData?.data?.email
                : profileData?.data?.user?.email}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate(screenNames.EditProfile, {
                    profileName: userData?.data?.name
                      ? userData?.data?.name
                      : profileData?.data?.user?.givenName,
                    phoneNumber: userData?.data?.phone,
                    profileImage: `data:image/jpeg;base64,${userData?.data?.profile_image_url}`,
                  })
                }>
                <Text style={styles.editButtonText}>Edit profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.packageCard}>
            <View style={styles.packageHeader}>
              <View style={styles.packageTitleContainer}>
                <View
                  style={{
                    width: normalize(42),
                    height: normalize(42),
                    backgroundColor: '#1F1F1E',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: normalize(12),
                  }}>
                  <Image
                    source={
                      userData?.data?.subscription.id === 'basic'
                        ? image.basicCrown
                        : userData?.data?.subscription.id === 'free'
                        ? image.freeRocket
                        : image.premiumStar
                    }
                    style={{height: normalize(20), width: normalize(20)}}
                  />
                </View>
                <Text style={styles.packageTitle}>
                  {userData?.data?.subscription.id === 'basic'
                    ? 'Basic Package'
                    : userData?.data?.subscription.id === 'free'
                    ? 'Free Package'
                    : 'Premium Package'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.manageButton}
                onPress={() =>
                  navigation.navigate(screenNames.ManagePlan, {
                    subscription: false,
                    plan: currentPlan,
                    subscriptionData: userData?.data?.subscription,
                  })
                }>
                <Text style={styles.manageButtonText}>Manage plan →</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.tokensLabel}>Tokens remaining</Text>
            <View style={styles.tokenContainer}>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                {userData?.data?.subscription.id === 'premium' ? (
                  <Text style={styles.unlimitedText}>Unlimited</Text>
                ) : (
                  <>
                    <Text style={styles.largeText}>
                      {userData?.data?.subscription.tokens}/
                    </Text>
                    <Text style={styles.smallText}>
                      {
                        data?.data?.[userData?.data?.subscription?.id]
                          ?.token_limit?.limit
                      }
                    </Text>
                  </>
                )}
              </View>
              <ProgressBar
                subscriptionData={userData?.data?.subscription}
                upperBarColor={'#000'}
                backBarColor={'#CA9907'}
                limit={
                  data?.data?.[userData?.data?.subscription?.id]?.token_limit
                    ?.limit
                }
              />
            </View>
          </View>

          <View style={styles.settingsSection}>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingTitle}>
                  Subscribe to news letters
                </Text>
                <Text style={styles.settingDescription}>
                  You will receive newsletters at your registered email address.
                </Text>
              </View>
              <Switch
                value={isSubscribed}
                onValueChange={handleNewsSubscribe}
                trackColor={{false: '#3a3a3a', true: '#ffc107'}}
                thumbColor="#fff"
              />
            </View>
            {/* <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>
                You will receive notifications at your registered email address.
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationEnabled}
              trackColor={{false: '#3a3a3a', true: '#ffc107'}}
              thumbColor="#fff"
            />
          </View> */}
            <ButtonArrow
              buttonTitle={'Delete Account'}
              buttonSubTitle={'Deleted accounts cant be recovered.'}
              onPress={() => {
                navigation.navigate(screenNames.DeleteAccount, {
                  email: profileData?.data?.user?.email,
                });
              }}
              backgroundColor={'#fff'}
              iconColor={'#fff'}
              containerStyle={{marginBottom: 0}}
            />
            <ButtonArrow
              buttonTitle={'Change Password'}
              buttonSubTitle={'Update your account password.'}
              onPress={() => navigation.navigate(screenNames.ChangePassword)}
              backgroundColor={'#fff'}
              iconColor={'#fff'}
              containerStyle={{marginBottom: 20, marginTop: 0}}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: normalize(30),
  },
  avatar: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    marginBottom: normalize(10),
  },
  name: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: normalize(5),
    fontFamily: fonts.InstrumentSem,
  },
  username: {
    fontSize: normalize(16),
    color: '#888',
    marginBottom: normalize(20),
    fontFamily: fonts.InstrumentSem,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: normalize(10),
  },
  logoutButton: {
    backgroundColor: '#ffc107',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
    borderRadius: normalize(20),
  },
  logoutButtonText: {
    color: '#000',
    fontWeight: '600',
    fontFamily: fonts.InstrumentSem,
  },
  editButton: {
    backgroundColor: '#fff',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
    borderRadius: normalize(20),
  },
  editButtonText: {
    color: '#000',
    fontWeight: '600',
    fontFamily: fonts.InstrumentSem,
  },
  packageCard: {
    backgroundColor: '#ffc107',
    borderRadius: normalize(20),
    padding: normalize(20),
    marginBottom: normalize(30),
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(25),
  },
  packageTitleContainer: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  packageTitle: {
    fontSize: normalize(18),
    fontFamily: fonts.InstrumentSem,
    fontWeight: '600',
    color: '#000',
  },
  manageButton: {
    borderWidth: normalize(1),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(19),
  },
  manageButtonText: {
    fontSize: normalize(12),
    fontFamily: fonts.HammerRegular,
    color: '#000',
    textAlign: 'center',
    lineHeight: normalize(18),
  },
  tokensLabel: {
    fontSize: normalize(13),
    marginBottom: normalize(5),
    fontFamily: fonts.InstrumentSem,
    color: '#000',
  },
  tokenContainer: {
    gap: normalize(5),
  },
  tokenCount: {
    fontSize: normalize(32),
    fontWeight: 'bold',
  },
  tokenTotal: {
    fontSize: normalize(32),
    color: '#666',
  },
  progressBar: {
    flex: 1,
    height: normalize(6),
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: normalize(3),
  },
  progress: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: normalize(3),
  },
  settingsSection: {
    gap: normalize(20),
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: normalize(18),
    fontWeight: '600',
    color: '#fff',
    marginBottom: normalize(5),
    fontFamily: fonts.InstrumentSem,
  },
  settingDescription: {
    fontSize: normalize(12),
    color: '#888',
    maxWidth: '80%',
    fontFamily: fonts.InstrumentSem,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: normalize(20),
    borderRadius: normalize(20),
  },
  actionButtonTitle: {
    fontSize: normalize(18),
    fontWeight: '600',
    marginBottom: normalize(5),
  },
  actionButtonDescription: {
    fontSize: normalize(14),
    color: '#666',
  },
  largeText: {
    fontSize: normalize(40),
    fontFamily: fonts.InstrumentSem,
    color: '#000',
  },
  smallText: {
    fontSize: normalize(20),
    fontFamily: fonts.InstrumentSem,
    color: '#CA9907',
  },
  unlimitedText: {
    fontSize: normalize(25),
    fontWeight: '600',
    fontFamily: fonts.InstrumentSem,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ProfileScreen;
