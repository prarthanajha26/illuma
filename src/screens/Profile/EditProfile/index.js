import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {icons, image} from '../../../assets';
import {normalize} from '../../../utils/dimension';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfileRequest} from '../../../redux/action/updateProfileAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({navigation, route}) {
  const {profileName, phoneNumber, profileImage} = route?.params;
  const {loading, error, success} = useSelector(state => state.profileReducer);

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
    dispatch({type: 'CLEAR_PROFILE_STATUS'});
    if (success) {
      navigation.goBack();
    } else if (error) {
      Alert.alert(
        'Image size is too large',
        'Please select an image that is less than 5MB in size.',
      );
    } else {
      return;
    }
  }, [success, error]);
  const [name, setName] = useState(
    profileName ? profileName : profileData?.data?.user?.name,
  );
  const [phone, setPhone] = useState(
    phoneNumber ? phoneNumber : profileData?.data?.user?.phone,
  );

  const [phoneError, setPhoneError] = useState('');
  const dispatch = useDispatch();
  const [base64, setBase64] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [profileData, setProfileData] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setBase64(response.assets[0].base64);
        setSelectedImage(imageUri);
      }
    });
  };

  const validatePhone = phone => {
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return phonePattern.test(phone);
  };

  const handleSave = async () => {
    setPhoneError('');

    if (phone) {
      if (!validatePhone(phone)) {
        setPhoneError('Invalid phone number');
        return;
      }
    }

    dispatch(
      updateProfileRequest({
        email: profileData?.data?.user?.email,
        name: name,
        phone: phone,
        profile_image: base64,
      }),
    );

    await AsyncStorage.setItem(
      'token',
      JSON.stringify({
        data: {
          user: {
            givenName: name,
            email: profileData?.data?.user?.email,
          },
        },
      }),
    );
  };

  const isButtonDisabled = !name && !phone;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.leftArrow}
              style={{height: normalize(20), width: normalize(20)}}
            />
            <Text style={styles.headerTitle}>Back to account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                selectedImage
                  ? {uri: selectedImage}
                  : profileImage !== 'data:image/jpeg;base64,null'
                  ? {uri: profileImage}
                  : image.dummyProfile
              }
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={openImagePicker}>
              <Image
                source={image.editImage}
                style={{
                  height: normalize(30),
                  width: normalize(30),
                  position: 'absolute',
                  bottom: normalize(0),
                  right: normalize(5),
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileTitle}>Update profile picture</Text>
        </View>

        <View style={styles.form}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#ffffff"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#ffffff"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.saveButton,
              {backgroundColor: isButtonDisabled ? '#A5A5A5' : '#FFB800'},
            ]}
            onPress={handleSave}
            disabled={isButtonDisabled}>
            {loading ? (
              <ActivityIndicator
                style={{fontSize: normalize(16)}}
                size="small"
                color="#fff"
              />
            ) : (
              <>
                <Text style={styles.saveButtonText}>Save changes</Text>
                <Image source={icons.arrow} style={styles.saveButtonArrow} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    padding: normalize(16),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: normalize(16),
    marginLeft: normalize(8),
  },
  profileSection: {
    alignItems: 'center',
    marginTop: normalize(20),
  },
  profileImageContainer: {
    position: 'relative',
    width: normalize(120),
    height: normalize(120),
  },
  profileImage: {
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(60),
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFB800',
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTitle: {
    color: 'white',
    fontSize: normalize(24),
    fontWeight: '600',
    marginTop: normalize(16),
  },
  form: {
    padding: normalize(16),
    marginTop: normalize(20),
  },
  inputGroup: {
    marginBottom: normalize(20),
  },
  label: {
    color: 'white',
    fontSize: normalize(16),
    marginBottom: normalize(8),
  },
  required: {
    color: '#FF3B30',
  },
  input: {
    borderColor: '#484848',
    borderRadius: normalize(8),
    padding: normalize(14),
    color: 'white',
    fontSize: normalize(16),
    borderWidth: 1,
    backgroundColor: '#31302F',
  },
  saveButton: {
    backgroundColor: '#FFB800',
    borderRadius: normalize(17),
    height: normalize(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(16),
  },
  saveButtonText: {
    color: 'black',
    fontSize: normalize(16),
    fontWeight: '600',
  },
  saveButtonArrow: {
    marginLeft: normalize(8),
    tintColor: '#000',
    alignSelf: 'center',
    height: normalize(20),
    width: normalize(20),
  },
  errorText: {
    color: '#FF3B30',
    fontSize: normalize(14),
    marginTop: normalize(4),
  },
});
