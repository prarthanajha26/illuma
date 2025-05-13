import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, icons} from '../../assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {screenNames} from '../../navigator/screenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../redux/action/createUserActions';
import {Alert} from 'react-native';
import styles from './style';
import {updateProfileRequest} from '../../redux/action/updateProfileAction';
import {getUserDataRequest} from '../../redux/action/getUserdata';
import {isIOS, normalize} from '../../utils/dimension';

const Login = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {userData} = useSelector(state => state.getUserData);

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '609450172227-0577jbp72hnevclbql3a5rp6ppr1an71.apps.googleusercontent.com',
    });
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      username: '',
      password: '',
    };

    if (!username.trim()) {
      newErrors.username = 'Username/Email is required';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    dispatch(getUserDataRequest(username));
    setSubmitted(true);
    if (validate()) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          username,
          password,
        );
        const user = userCredential.user;
        if (user.emailVerified) {
          checkEmailVerification(user);
        } else {
          Alert.alert(
            'Email Not Verified',
            'Please verify your email before logging in.',
            [
              {text: 'OK'},
              {
                text: 'Verify',
                onPress: async () => await user.sendEmailVerification(),
              },
            ],
          );
        }
      } catch (error) {
        console.log('Login error:', error.code);
        let errorMessage = 'Something went wrong.';
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'User not found. Please check your email.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid credentials.';
        }
        Alert.alert('Login Error', errorMessage);
      }
    }
  };
  let name = '';
  let email = '';
  useEffect(() => {
    dispatch(
      updateProfileRequest({
        email: email,
        name: userData ? userData?.data?.name : name,
      }),
    );
  }, [userData]);

  const checkEmailVerification = async user => {
    await user.reload();
    if (user.emailVerified) {
      dispatch(createUser({email: user.email}));
      name = user.displayName;
      email = user.email;
      // dispatch(
      //   updateProfileRequest({
      //     email: user.email,
      //     name: userData ? userData?.data?.name : user.displayName,
      //   }),
      // );

      await AsyncStorage.setItem(
        'token',
        JSON.stringify({
          data: {
            user: {
              givenName: user.displayName,
              email: user.email,
            },
          },
        }),
      );
      await AsyncStorage.setItem('loggedIn', 'true');
      Keyboard.dismiss();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: screenNames.Home,
            params: {loginResult: user},
          },
        ],
      });
    } else {
      Alert.alert(
        'Email Not Verified',
        'Please verify your email before logging in.',
        [
          {text: 'OK'},
          {
            text: 'Verify',
            onPress: async () => await user.sendEmailVerification(),
          },
        ],
      );
    }
  };

  const handleInputChange = (field, value) => {
    if (submitted) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
    if (field === 'username') {
      setUsername(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onGoogleButtonPress = async () => {
    try {
      const result = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (result) {
        const signInResult = await GoogleSignin.signIn();
        const googleEmail = signInResult?.data?.user?.email;
        dispatch(getUserDataRequest(googleEmail));
        if (signInResult.type !== 'cancelled') {
          dispatch(createUser({email: googleEmail}));
          email = googleEmail;
          name = signInResult?.data?.user?.givenName;
          // dispatch(
          //   updateProfileRequest({
          //     email: googleEmail,
          //     name: userData
          //       ? userData?.data?.name
          //       : signInResult?.data?.user?.givenName,
          //   }),
          // );

          await AsyncStorage.setItem(
            'token',
            JSON.stringify({
              data: {
                user: {
                  givenName: signInResult?.data?.user?.givenName,
                  email: googleEmail,
                },
              },
            }),
          );
          await AsyncStorage.setItem('loggedIn', 'true');
        }
        const idToken = signInResult.data?.idToken;
        if (!idToken) {
          throw new Error('No ID token found');
        }
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: screenNames.Home,
              params: {loginResult: googleCredential},
            },
          ],
        });
      }
    } catch (err) {
      console.log(err, 'err');
    }
  };
  const isSubmitDisabled = Boolean(
    !username.trim() || !password.trim() || errors.username || errors.password,
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {paddingTop: insets.top}]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
        }}>
        <View style={styles.centered}>
          <View style={styles.logoContainer}>
            <Image
              source={icons.splashLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.getStartedContainer}>
            <View style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>Welcome Back</Text>
            </View>
          </View>
          <View>
            <Text style={styles.signupTitle}>Sign In Account</Text>
            <Text style={styles.signupDescription}>
              Enter your personal detail to log into your account
            </Text>
            {!isIOS && (
              <View style={styles.googleButtonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.googleButton}
                  onPress={onGoogleButtonPress}>
                  <Image source={icons.googleIcon} style={styles.googleIcon} />
                  <Text
                    style={{color: '#fff', fontFamily: fonts.InstrumentReg}}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {!isIOS && (
            <View style={styles.orContainer}>
              <View style={styles.orDivider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.orDivider} />
            </View>
          )}
        </View>
        <View style={isIOS && styles.mainContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.username && {borderColor: 'red'}]}
              placeholder="Email Address"
              placeholderTextColor="#AAA8A8"
              value={username}
              onChangeText={text => handleInputChange('username', text)}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[styles.input, errors.password && {borderColor: 'red'}]}
                placeholder="Enter Your Password"
                placeholderTextColor="#AAA8A8"
                value={password}
                secureTextEntry={!isPasswordVisible}
                onChangeText={text => handleInputChange('password', text)}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.eyeIconContainer}
                onPress={togglePasswordVisibility}>
                <Image
                  source={isPasswordVisible ? icons.eyeIconOpen : icons.eyeIcon}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.forgotPasswordButton}
                onPress={() => navigation.navigate(screenNames.ForgotPassword)}>
                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.signupButton,
                {opacity: isSubmitDisabled ? 0.5 : 1},
              ]}
              disabled={isSubmitDisabled}
              onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View style={{flexDirection: 'row', gap: normalize(10)}}>
                  <Text style={styles.signupButtonText}>Sign In</Text>
                  <Image
                    source={icons.arrow}
                    style={{
                      height: normalize(20),
                      width: normalize(20),
                      tintColor: '#000',
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.accountQuestionContainer}>
            <Text style={styles.accountQuestionText}>
              Don't have an account?
            </Text>
            <Text
              onPress={() => navigation.navigate(screenNames.Register)}
              style={styles.signupLink}>
              Sign up
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
