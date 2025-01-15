import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons} from '../../assets';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {screenNames} from '../../navigator/screenName';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../redux/action/createUserActions';

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

  const usernameRegex = /^[a-zA-Z0-9]+$/;
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
      return 'Username must be alphanumeric.';
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
        dispatch(createUser({email}));

        navigation.navigate(screenNames.Login);
      } catch (err) {
        console.error('Account creation error:', err);
      }
    }
  };

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
      console.log(result, 'hello');
      if (result) {
        const signInResult = await GoogleSignin.signIn();
        const googleEmail = signInResult?.data?.user?.email;
        console.log(googleEmail, 'signInResult');

        if (signInResult.type !== 'cancelled') {
          dispatch(createUser({email: googleEmail}));
          await AsyncStorage.setItem('token', JSON.stringify(signInResult));
          await AsyncStorage.setItem('loggedIn', 'true');
        } else {
          console.log('Failed to fetch profile information.');
        }

        const idToken = signInResult.data?.idToken;
        if (!idToken) {
          throw new Error('No ID token found');
        }
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        navigation.navigate(screenNames.Home, {signInResult: signInResult});
      }
    } catch (err) {
      console.log(err, 'errhfgsdhjgcdsjh');
    }
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
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
          placeholder="UserName"
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
          {showErrors && passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
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

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.signupButton,
            {backgroundColor: isSignupEnabled ? '#FFBF00' : '#FFBF004D'},
          ]}
          onPress={handleSignup}
          disabled={!isSignupEnabled}>
          {loading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up {'->'}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.accountQuestionContainer}>
        <Text style={styles.accountQuestionText}>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate(screenNames.Login)}
          style={styles.signupLink}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default Register;
