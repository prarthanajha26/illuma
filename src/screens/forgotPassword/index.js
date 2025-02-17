import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {icons} from '../../assets';
import {normalize} from '../../utils/dimension';
import auth from '@react-native-firebase/auth';
import {sendPasswordResetEmail} from '@react-native-firebase/auth'; // Firebase import

export default function RecoverAccount() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setSuccessMessage(''); // Clear any previous success messages

    try {
      // Sending password reset email via Firebase Auth
      await auth().sendPasswordResetEmail(email);
      setSuccessMessage('A password reset link has been sent to your email');
      console.log('Sending OTP to:', email); // You can replace this with other log info if needed.
    } catch (e) {
      // Handle any errors during the password reset process
      setError('Something went wrong. Please try again later.');
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={icons.splashLogo}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.recoverPill}>
          <Text style={styles.recoverText}>Recover Account</Text>
        </View>

        <Text style={styles.title}>Request OTP</Text>
        <Text style={styles.subtitle}>
          Enter your email address to recover your account
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Username/email address"
          placeholderTextColor="#666"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setError('');
            setSuccessMessage(''); // Clear success message if user starts typing
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>Send OTP →</Text>
        </TouchableOpacity>

        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>Try another way to recover? </Text>
          <TouchableOpacity>
            <Text style={styles.helpLink}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: normalize(22),
    height: normalize(31),
    marginBottom: normalize(40),
  },
  recoverPill: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: normalize(40),
  },
  recoverText: {
    color: '#FFF',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: normalize(10),
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: normalize(40),
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  successText: {
    color: '#28a745',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFB800',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(50),
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  helpText: {
    color: '#999',
    fontSize: 14,
  },
  helpLink: {
    color: '#FFB800',
    fontSize: 14,
  },
});
