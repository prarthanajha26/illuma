import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {useEffect, useState} from 'react';
import {fonts, icons} from '../../assets';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {screenNames} from '../../navigator/screenName';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../redux/action/createUserActions';
import {updateProfileRequest} from '../../redux/action/updateProfileAction';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getUserDataRequest} from '../../redux/action/getUserdata';
import {normalize} from '../../utils/dimension';

const Register = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {userData, userDataloading} = useSelector(state => state.getUserData);
  const usernameRegex = /^[a-zA-Z0-9]+([ ]?[a-zA-Z0-9]+)*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '609450172227-0577jbp72hnevclbql3a5rp6ppr1an71.apps.googleusercontent.com',
    });
  });

  const validateUsername = () => {
    if (!usernameRegex.test(username)) {
      return 'Invalid Username';
    }
    return '';
  };

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long, include one uppercase letter, and one special character.';
    }
    return '';
  };

  const handleSignup = async () => {
    setShowErrors(true);
    const usernameValidationError = validateUsername();
    const emailValidationError = validateEmail();
    const passwordValidationError = validatePassword();
    setUsernameError(usernameValidationError);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (
      !usernameValidationError &&
      !emailValidationError &&
      !passwordValidationError
    ) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await userCredential.user.updateProfile({
          displayName: username,
        });
        const user = userCredential.user;
        await user.sendEmailVerification();
        Alert.alert(
          'Email Verification',
          'Please check your email to verify your account before logging in.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate(screenNames.Login, {
                  username: user.displayName,
                });
                Keyboard.dismiss();
              },
            },
          ],
        );
      } catch (err) {
        console.error('Account creation error:', err);
        Alert.alert(
          'Error',
          'An error occurred during sign up. Please try again.',
        );
        Keyboard.dismiss();
      }
    }
  };

  let name = '';
  let registerEmail = '';
  useEffect(() => {
    dispatch(
      updateProfileRequest({
        email: registerEmail,
        name: userData ? userData?.data?.name : name,
      }),
    );
  }, [userData]);

  const isSignupEnabled =
    username &&
    email &&
    password &&
    !usernameError &&
    !emailError &&
    !passwordError;

  const togglePassword = () => {
    setIsPasswordVisible(prevState => !prevState);
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
          registerEmail = googleEmail;
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {paddingTop: insets.top}]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
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
              <Text style={styles.getStartedText}>Get Started</Text>
            </View>
          </View>
          <View>
            <Text style={styles.signupTitle}>Sign up Account</Text>
            <Text style={styles.signupDescription}>
              Enter your personal details to create an account
            </Text>
            <View style={styles.googleButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.googleButton}
                onPress={onGoogleButtonPress}>
                <Image source={icons.googleIcon} style={styles.googleIcon} />
                <Text style={{color: '#fff', fontFamily: fonts.InstrumentReg}}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.orContainer}>
            <View style={styles.orDivider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orDivider} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={'#AAA8A8'}
            value={username}
            onChangeText={text => {
              setUsername(text);
              if (showErrors) setUsernameError('');
            }}
          />
          {showErrors && usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}

          <TextInput
            style={styles.emailinput}
            placeholder="Email Address"
            placeholderTextColor={'#AAA8A8'}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (showErrors) setEmailError('');
            }}
          />
          {showErrors && emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              placeholderTextColor={'#AAA8A8'}
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (showErrors) setPasswordError('');
              }}
            />

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={togglePassword}
              style={styles.eyeIconContainer}>
              <Image
                source={isPasswordVisible ? icons.eyeIcon : icons.eyeIcon}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {showErrors && passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.signupButton,
              {backgroundColor: isSignupEnabled ? '#FFBF00' : '#FFBF004D'},
            ]}
            onPress={handleSignup}
            disabled={!isSignupEnabled}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <View style={{flexDirection: 'row', gap: normalize(10)}}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
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
            Already have an account?
          </Text>
          <Text
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate(screenNames.Login);
            }}
            style={styles.signupLink}>
            Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
