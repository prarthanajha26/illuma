import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import {icons} from '../../../assets';
import {normalize} from '../../../utils/dimension';
import auth from '@react-native-firebase/auth';
import {screenNames} from '../../../navigator/screenName';

export default function ChangePasswordScreen({navigation}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [isGmailUser, setIsGmailUser] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const user = auth().currentUser;

  useEffect(() => {
    const checkIfGmailUser = () => {
      const providerData = user?.providerData;
      const isGoogleSignIn = providerData?.some(
        provider => provider.providerId === 'google.com',
      );
      if (isGoogleSignIn) {
        setIsGmailUser(true);
        setModalVisible(true);
      }
    };

    checkIfGmailUser();
  }, []);

  // Validation function for new password
  const validatePassword = password => {
    const minLength = 8;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!specialCharPattern.test(password)) {
      return 'Password must contain at least one special character.';
    }
    if (!upperCasePattern.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!lowerCasePattern.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }

    return '';
  };

  // Function to check if passwords match
  const checkPasswordMatch = () => {
    if (newPassword !== confirmPassword) {
      setMatchError('Passwords do not match.');
    } else {
      setMatchError('');
    }
  };

  // Reauthenticate the user before making changes
  const reauthenticate = async () => {
    const userCredential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    try {
      await user.reauthenticateWithCredential(userCredential);
      return true;
    } catch (error) {
      setCurrentPasswordError('Incorrect current password.');
      return false;
    }
  };

  // Handling form submission
  const handleSubmit = async () => {
    if (isGmailUser) {
      setModalVisible(true);
      return;
    }

    const passwordValidationError = validatePassword(newPassword);
    setPasswordError(passwordValidationError);
    checkPasswordMatch();

    if (!passwordValidationError && !matchError) {
      const isReauthenticated = await reauthenticate();
      if (isReauthenticated) {
        try {
          await user.updatePassword(newPassword);
          console.log('Password changed successfully!');

          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setShowCurrentPassword(false);
          setShowNewPassword(false);
          setShowConfirmPassword(false);
          setPasswordError('');
          setMatchError('');
          setCurrentPasswordError('');

          navigation.navigate(screenNames.Profile);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate(screenNames.Profile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.leftArrow}
            style={{height: normalize(20), width: normalize(20)}}
          />
          <Text style={styles.backText}>Back to account</Text>
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Change your password for enhanced security and account access.
          </Text>

          {/* Current Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor="#666"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <Pressable
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                style={styles.eyeIcon}>
                <Image
                  source={icons.eyeIcon}
                  style={{height: normalize(25), width: normalize(25)}}
                />
              </Pressable>
            </View>
            {currentPasswordError ? (
              <Text style={styles.errorText}>{currentPasswordError}</Text>
            ) : null}

            {/* New Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#666"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                onBlur={() => {
                  const error = validatePassword(newPassword);
                  setPasswordError(error);
                }}
              />
              <Pressable
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeIcon}>
                <Image
                  source={icons.eyeIcon}
                  style={{height: normalize(25), width: normalize(25)}}
                />
              </Pressable>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            {/* Confirm New Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#666"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={checkPasswordMatch}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}>
                <Image
                  source={icons.eyeIcon}
                  style={{height: normalize(25), width: normalize(25)}}
                />
              </Pressable>
            </View>
            {matchError ? (
              <Text style={styles.errorText}>{matchError}</Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleSubmit}>
            <Text style={styles.resetButtonText}>Reset password →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              You cannot change your password from here because you're signed in
              through Gmail. Please log out and change your password via Gmail
              settings.
            </Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    fontSize: 12,
    marginBottom: 40,
  },
  inputContainer: {
    gap: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#31302F',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
    paddingRight: 50,
    borderWidth: 1,
    borderColor: '#484848',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{translateY: -12}],
  },
  resetButton: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  resetButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    // marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'black',
  },
});
