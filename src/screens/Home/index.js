import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {icons, image} from '../../assets';
import ButtonArrow from '../../components/ButtonArrow';
import {screenNames} from '../../navigator/screenName';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAnalysisRequest} from '../../redux/action/analysisAction';
import styles from './styles';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.analysis);
  const [selectedImage, setSelectedImage] = useState();
  const [base64, setBase64] = useState();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const getToken = async () => {
      try {
        const result = await AsyncStorage.getItem('token');
        setProfileData(JSON.parse(result));
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };
    getToken();
  }, [data]);

  const generateFalseImage = () => {
    if (profileData?.data?.user?.email && base64) {
      dispatch(fetchAnalysisRequest(profileData?.data?.user?.email, base64));
    }
  };

  useEffect(() => {
    if (data && !loading) {
      navigation.navigate(screenNames.Analysis, {data: data});
    }
  }, [data, loading, navigation, selectedImage]);

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
      console.log('User session cleared');
      navigation.replace(screenNames.Login);
    } catch (error) {
      console.error('Error during sign out:', error);
      Alert.alert('Error', 'Something went wrong while logging out!');
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
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

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setBase64(response.assets[0].base64);
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainView}>
          <View style={styles.header}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>hi,</Text>
              <Text style={styles.userNameText}>
                {profileData?.data?.user?.givenName}
              </Text>
            </View>
            <TouchableOpacity onPress={handleLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
            <View style={styles.avatar}></View>
          </View>

          <View style={styles.falseColorMap}>
            <Text style={styles.falseColorMapTitle}>False Color Map</Text>
            <Text style={styles.falseColorMapSubtitle}>
              Produce an Image Heatmap Overlay
            </Text>
          </View>

          <View style={styles.imagePickerContainer}>
            <View style={styles.imagePickerBox}>
              {!selectedImage ? (
                <View style={styles.imagePickerInner}>
                  <Text style={styles.uploadText}>Upload Your Image</Text>
                  <Text style={styles.uploadSubtitle}>
                    Accepted image formats are jpg, png & jpeg
                  </Text>
                  <View style={styles.dashedBorder}>
                    <Image source={image.upload} style={styles.uploadIcon} />
                    <Text style={styles.uploadDescription}>
                      Upload your image here to analyze and process results.
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={openImagePicker}
                      style={styles.browseButton}>
                      <Text style={styles.browseButtonText}>Browse images</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{uri: selectedImage}}
                    style={styles.selectedImage}
                  />
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={generateFalseImage}
                    style={styles.generateButton}>
                    <Text style={styles.generateButtonText}>
                      Generate Light Source Report.
                    </Text>
                    <View style={styles.arrowContainer}>
                      <Image source={icons.arrow} style={styles.arrowIcon} />
                    </View>
                  </TouchableOpacity>
                  {loading && (
                    <ActivityIndicator
                      style={styles.activityIndicator}
                      size="small"
                      color="#0000ff"
                    />
                  )}
                </View>
              )}
            </View>
            <ButtonArrow
              buttonTitle={'Open Camera'}
              buttonSubTitle={'Directly analyze the captured image.'}
              onPress={handleCameraLaunch}
            />
            <ButtonArrow
              buttonTitle={'Activity Log'}
              buttonSubTitle={'View your image analysis history.'}
              backgroundColor={'#fff'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
