import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAnalysisRequest} from '../../redux/action/analysisAction';
import {useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import {normalize} from '../../utils/dimension';
import {getUserDataRequest} from '../../redux/action/getUserdata';

const Home = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.analysis);
  const {userData, userDataloading} = useSelector(state => state.getUserData);
  const [selectedImage, setSelectedImage] = useState();
  const [base64, setBase64] = useState();
  const [profileData, setProfileData] = useState();
  const [falseImage, setFalseImage] = useState(false);
  const [visible, setVisible] = useState(false);
  const capitalizeFirstLetter = str => {
    try {
      if (str?.length === 0) return str;
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } catch (error) {
      console.error(
        'Error occurred while capitalizing the first letter:',
        error,
      );
      return str;
    }
  };

  const clearAnalysis = () => {
    setFalseImage(false);
    setSelectedImage(null);
    setBase64(null);
  };
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
    setFalseImage(true);
    if (
      profileData?.data?.user?.email &&
      base64 &&
      (userData?.data?.subscription?.tokens > 0 ||
        userData?.data?.subscription?.tokens === -1)
    ) {
      dispatch(fetchAnalysisRequest(profileData?.data?.user?.email, base64));
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    if (
      data &&
      !loading &&
      falseImage &&
      (userData?.data?.subscription?.tokens > 0 ||
        userData?.data?.subscription?.tokens === -1)
    ) {
      navigation.navigate(screenNames.Analysis, {
        data: data,
        email: profileData?.data?.user?.email,
      });
    }
    console.log(
      profileData?.data?.user?.email,
      'profileData?.data?.user?.email',
    );
    dispatch(getUserDataRequest(profileData?.data?.user?.email));
    dispatch({type: 'CLEAR_PROFILE_STATUS'});
  }, [data, loading, navigation]);

  const handleActivityLog = () => {
    navigation.navigate(screenNames.Notification);
  };
  useFocusEffect(
    React.useCallback(() => {
      clearAnalysis();
      dispatch(getUserDataRequest(profileData?.data?.user?.email));
    }, [profileData?.data?.user?.email]),
  );

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
        console.log('Image picker error: ', response?.error);
      } else {
        let imageUri = response?.uri || response.assets?.[0]?.uri;
        setBase64(response?.assets[0]?.base64);
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    if (userData.data.subscription.id === 'free') {
      setVisible(true);
    } else {
      const options = {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
          const imageUri =
            response.uri || (response.assets && response.assets[0]?.uri);
          const base64Image = response.assets?.[0]?.base64;

          if (imageUri) {
            setSelectedImage(imageUri);
          }
          if (base64Image) {
            setBase64(base64Image);
          }
        }
      });
    }
  };
  if (userDataloading || !userData) {
    return (
      <SafeAreaView style={styles.LoaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loaderText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainView}>
            <View style={styles.header}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Hi, </Text>
                <Text numberOfLines={1} style={styles.userNameText}>
                  {userData?.data?.name
                    ? capitalizeFirstLetter(userData?.data?.name)
                    : capitalizeFirstLetter(profileData?.data?.user?.givenName)}
                  {' !'}
                </Text>
              </View>
              <View style={styles.avatar}>
                <Image
                  source={
                    !userData?.data?.profile_image_url
                      ? image.dummyProfile
                      : {
                          uri: `data:image/jpeg;base64,${userData?.data?.profile_image_url}`,
                        }
                  }
                  style={styles.avatarImage}
                />
              </View>
            </View>

            <>
              <View style={styles.falseColorMap}>
                <Text style={styles.falseColorMapTitle}>
                  Your ultimate lighting assistant
                </Text>
                <Text style={styles.falseColorMapSubtitle}>
                  Decode the secrets of professional lighting
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
                        <Image
                          source={image.upload}
                          style={styles.uploadIcon}
                        />
                        <Text style={styles.uploadDescription}>
                          Upload your image here to analyze and process results.
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={openImagePicker}
                          style={styles.browseButton}>
                          <Text style={styles.browseButtonText}>
                            Browse images
                          </Text>
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
                        onPress={clearAnalysis}
                        style={{
                          backgroundColor: '#FFBF00',
                          height: normalize(30),
                          width: normalize(30),
                          borderRadius: normalize(20),
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          top: normalize(20),
                          right: normalize(20),
                        }}>
                        <Image
                          source={icons.cross}
                          style={{height: normalize(10), width: normalize(10)}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={generateFalseImage}
                        style={styles.generateButton}>
                        <View style={styles.generateButtonTextContainer}>
                          {loading ? (
                            <Text style={styles.generateButtonText}>
                              Running Analysis...
                            </Text>
                          ) : (
                            <Text style={styles.generateButtonText}>
                              Generate Light Source Report.
                            </Text>
                          )}
                        </View>
                        <View style={styles.arrowContainer}>
                          {loading ? (
                            <ActivityIndicator
                              style={styles.activityIndicator}
                              size="small"
                              color="#fff"
                            />
                          ) : (
                            <Image
                              source={icons.arrow}
                              style={styles.arrowIcon}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <ButtonArrow
                  buttonTitle={'Open Camera'}
                  buttonSubTitle={'Directly analyze the captured image.'}
                  onPress={handleCameraLaunch}
                  iconColor={'#FFBF00'}
                />
                <ButtonArrow
                  buttonTitle={'Activity Log'}
                  buttonSubTitle={'View your image analysis history.'}
                  onPress={handleActivityLog}
                  backgroundColor={'#fff'}
                  iconColor={'#fff'}
                />
              </View>
            </>
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}>
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <Image
                  source={image.oops}
                  style={{height: normalize(114), aspectRatio: 1}}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setVisible(false)}>
                  <Image
                    source={icons.cross}
                    style={{height: normalize(15), width: normalize(15)}}
                  />
                </TouchableOpacity>

                <Text style={styles.oopsText}>Oops!</Text>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {userData?.data?.subscription.id === 'free'
                      ? 'Free User!!'
                      : 'Subscription Expired '}

                    <Text style={styles.subtitle}>
                      {userData?.data?.subscription.id === 'free'
                        ? ' Change plan to Keep analysis'
                        : 'Reactivate now to keep analyzing.'}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate(screenNames.Subscription),
                      setVisible(false);
                  }}>
                  <Text style={styles.buttonText}>check plans</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
