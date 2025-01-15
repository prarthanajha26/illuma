import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons} from '../../assets';
import {normalize} from '../../utils/dimension';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {screenNames} from '../../navigator/screenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../redux/action/createUserActions';

const Login = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    setSubmitted(true);
    if (validate()) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          username,
          password,
        );
        const user = userCredential.user;
        await AsyncStorage.setItem('token', user.uid);
        await AsyncStorage.setItem('loggedIn', 'true');
        navigation.navigate(screenNames.Home, {loginResult: user});
      } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Something went wrong.';
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'User not found. Please check your email.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password. Please try again.';
        }
        Alert.alert('Login Error', errorMessage);
      }
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
      console.log(result, 'hello');
      if (result) {
        const signInResult = await GoogleSignin.signIn();
        const googleEmail = signInResult?.data?.user?.email;

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
  const isSubmitDisabled =
    !username.trim() || !password.trim() || errors.username || errors.password;

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
            <Text style={styles.getStartedText}>Welcome Back</Text>
          </View>
        </View>
        <View>
          <Text style={styles.signupTitle}>Sign In Account</Text>
          <Text style={styles.signupDescription}>
            Enter your personal detail to log into your account
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
          style={[styles.input, errors.username && {borderColor: 'red'}]}
          placeholder="Username/Email Address"
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
            style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.signupButton, {opacity: isSubmitDisabled ? 0.5 : 1}]}
          disabled={isSubmitDisabled}
          onPress={handleSubmit}>
          <Text style={styles.signupButtonText}>Sign In {'->'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountQuestionContainer}>
        <Text style={styles.accountQuestionText}>Don't have an account?</Text>
        <Text style={styles.signupLink}>Sign up</Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    paddingHorizontal: normalize(24),
  },
  centered: {
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(30),
  },
  logo: {
    width: normalize(22),
    height: undefined,
    aspectRatio: normalize(22) / normalize(31),
  },
  getStartedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#31302F',
    width: normalize(150),
    height: normalize(42),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(22),
    marginTop: normalize(30),
  },
  getStartedText: {
    color: '#fff',
    fontSize: normalize(17),
    fontWeight: normalize(600),
  },
  signupTitle: {
    color: '#fff',
    fontSize: normalize(23),
    fontWeight: normalize(600),
    textAlign: 'center',
    marginTop: normalize(20),
  },
  signupDescription: {
    color: '#fff',
    fontSize: normalize(13),
    fontWeight: normalize(600),
    marginTop: normalize(20),
  },
  googleButtonContainer: {
    marginTop: normalize(40),
    alignItems: 'center',
  },
  googleButton: {
    height: normalize(52),
    width: normalize(74),
    backgroundColor: '#31302F',
    borderRadius: normalize(17),
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: normalize(28),
    height: undefined,
    aspectRatio: 1,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  orDivider: {
    borderWidth: 1,
    borderColor: '#5E5E5E',
    width: normalize(130),
    height: normalize(0),
  },
  orText: {
    color: '#5E5E5E',
    fontWeight: normalize(600),
    fontSize: normalize(13),
    paddingHorizontal: normalize(10),
  },
  inputContainer: {
    marginTop: normalize(30),
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAA8A8',
    borderRadius: normalize(13),
    padding: normalize(20),
    backgroundColor: '#484848',
    color: '#fff',
  },
  passwordInputContainer: {
    marginTop: normalize(20),
  },
  eyeIconContainer: {
    position: 'absolute',
    right: normalize(20),
    top: normalize(18),
    padding: normalize(5),
  },
  eyeIcon: {
    width: normalize(25),
    height: undefined,
    aspectRatio: 1,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: normalize(20),
    marginRight: normalize(8),
  },
  forgotPasswordText: {
    color: '#fff',
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#AAA8A8',
    borderRadius: normalize(13),
    padding: normalize(20),
    backgroundColor: '#FFBF00',
    marginTop: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'black',
  },
  accountQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(30),
  },
  accountQuestionText: {
    color: '#fff',
  },
  signupLink: {
    color: '#FFBF00',
    paddingLeft: normalize(10),
  },
  errorText: {
    color: 'red',
    fontSize: normalize(12),
    paddingLeft: normalize(20),
    marginTop: 5,
  },
});
