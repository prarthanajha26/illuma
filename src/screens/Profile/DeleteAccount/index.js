import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {icons, image} from '../../../assets';
import {normalize} from '../../../utils/dimension';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {deleteUserRequest} from '../../../redux/action/deleteUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {screenNames} from '../../../navigator/screenName';

export default function DeleteAccountScreen({navigation, route}) {
  const {email} = route?.params;

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false); // <-- Add loading state

  const dispatch = useDispatch();
  const {error} = useSelector(state => state.deleteUser);

  const handleDelete = async () => {
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

    if (!loading && isChecked) {
      setLoading(true);
      try {
        dispatch(deleteUserRequest(email));
        dispatch({type: 'CLEAR_BOOKMARK_DATA'});
        dispatch({type: 'CLEAR_ACTIVITY_DATA'});
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('loggedIn');
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        navigation.replace(screenNames.Login);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.leftArrow}
          style={{height: normalize(20), width: normalize(20)}}
        />
        <Text style={styles.headerText}>Back to account</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Delete Account</Text>

        <Text style={styles.description}>
          Deleting your account is permanent and cannot be undone. All data,
          including preferences and history, will be erased, subscriptions won't
          be canceled automatically, and linked third-party services will lose
          access. Proceed carefully and back up important data.
        </Text>

        {/* Checkbox */}
        <Pressable
          style={styles.checkboxContainer}
          onPress={() => setIsChecked(!isChecked)}>
          <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
            {isChecked && (
              <Image
                source={image.check}
                style={{height: normalize(15), width: normalize(15)}}
              />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            I acknowledge account deletion consequences.
          </Text>
        </Pressable>

        {/* Error Message */}
        {error && (
          <Text style={styles.errorText}>
            Unexpected error, please contact support
          </Text>
        )}

        {/* Delete Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            {backgroundColor: isChecked ? '#FFB800' : '#FFB80014'},
          ]}
          onPress={handleDelete}
          disabled={!isChecked}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.saveButtonText}>Delete Account</Text>
              <Image
                source={icons.arrow}
                style={{
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  tintColor: '#000',
                }}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 21,
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8E8E93',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#31302F',
    borderColor: '#FFFFFF',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  checkboxLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    flex: 1,
  },
  errorText: {
    color: '#FF453A',
    fontSize: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#FFB800',
    borderRadius: 17,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonArrow: {
    marginLeft: 8,
    fontSize: 20,
  },

  buttonArrow: {
    transform: [{rotate: '180deg'}],
  },
  bottomNav: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAA8A8',
    borderRadius: normalize(13),
    padding: normalize(20),
    backgroundColor: '#484848',
    color: '#fff',
  },
});
