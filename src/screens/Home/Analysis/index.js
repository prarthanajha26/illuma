import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {normalize} from '../../../utils/dimension';
import {fonts, icons, image} from '../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {updateBookmarkRequest} from '../../../redux/action/updatBookmarAction';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Analysis = props => {
  const navigation = useNavigation();
  const {data, email} = props?.route?.params;
  const [falseImage, setFalseImage] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isbookmark, setIsbookmark] = useState(!data.bookmark);
  const {loading} = useSelector(state => state.updateBookmarkReducer);
  const [fetching, setFetching] = useState(false);
  const [real, setReal] = useState(null);
  const [heat, setHeat] = useState(null);
  const dispatch = useDispatch();

  const [date, time] = data.timestamp.split('T');
  const formattedTime = time.slice(0, 5);

  const fetchData = async url => {
    setFetching(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      // Get the response as a Blob
      const blob = await response.blob();

      // Convert Blob to Base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      return base64; // Return Base64 string
    } catch (error) {
      console.log(error, 'fetah data error');
    } finally {
      setFetching(false);
    }
  };

  const setImage = async () => {
    if (data?.image && !fetching) {
      const original = await fetchData(data.image);
      setReal(original);
      const heatImage = await fetchData(data.false_image);
      setHeat(heatImage);
    }
  };

  useEffect(() => {
    if (data) {
      setImage();
    }
  }, [data?.image, data?.false_image]);

  const viewFalseImage = () => {
    setFalseImage(prev => !prev);
  };
  const handleFullscreen = () => {
    setFullScreen(prev => !prev);
  };

  const handleBookmark = () => {
    setIsbookmark(prev => !prev);
    dispatch(updateBookmarkRequest(email, data.unique_id, isbookmark));
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {fetching ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="small"
          color="#fff"
        />
      ) : (
        <View style={[loading && {pointerEvents: 'none'}, styles.wrapper]}>
          {!fullScreen ? (
            <ScrollView style={styles.scrollView}>
              <View style={styles.container}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}>
                  <Image
                    source={icons.leftArrow}
                    style={styles.backButtonImage}
                  />
                  <Text style={styles.backButtonText}> Back to Home</Text>
                </TouchableOpacity>

                <View style={styles.analysisHeader}>
                  <Text style={styles.analysisTitle}>Analysis Summary</Text>
                  <TouchableOpacity onPress={handleBookmark}>
                    <Image
                      source={
                        !isbookmark ? image.filledBookmark : image.bookMark
                      }
                      style={styles.bookMarkIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {date} @ {formattedTime}
                  </Text>
                </View>

                <View style={styles.imageContainer}>
                  {real || heat ? (
                    <Image
                      style={styles.selectedImage}
                      onLoad={handleImageLoad}
                      source={{
                        uri: !falseImage ? `${real}` : `${heat}`,
                      }}
                    />
                  ) : null}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={viewFalseImage}
                    style={[
                      styles.viewFalseImageButton,
                      isImageLoading && {opacity: 0.5},
                    ]}
                    disabled={isImageLoading}>
                    <Text style={styles.viewFalseImageText}>
                      {!falseImage ? `View False Image` : 'View Original Image'}
                    </Text>
                    <View style={styles.arrowContainer}>
                      <Image source={icons.arrow} style={styles.arrowIcon} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleFullscreen}
                    style={{
                      position: 'absolute',
                      backgroundColor: '#2E3131',
                      width: normalize(35),
                      height: normalize(35),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: normalize(100),
                      right: normalize(20),
                      top: normalize(20),
                    }}>
                    <Image
                      source={image.fullScreen}
                      style={{
                        height: undefined,
                        width: normalize(24),
                        aspectRatio: 1,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Description</Text>
                  <Text style={styles.cardContent}>
                    {data?.analysis?.description}
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Light Source Ananlysis</Text>
                  {data?.analysis?.light_source_analysis?.map(item => (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: normalize(5),
                        width: '95%',
                      }}>
                      <Text style={{color: '#fff', top: normalize(5)}}>
                        {'* '}
                      </Text>
                      <Text style={styles.cardContent}>{item}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>False Color Analysis</Text>
                  <View style={styles.ZoneContainer}>
                    <Text style={styles.ZoneText}>Zones</Text>
                  </View>
                  {data?.analysis?.false_color_analysis?.zones?.map(item => (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: normalize(5),
                        width: '95%',
                      }}>
                      <Text style={{color: '#fff', top: normalize(5)}}>
                        {'* '}
                      </Text>
                      <Text style={styles.cardContent}>{item}</Text>
                    </View>
                  ))}
                  <View style={styles.intensityContainer}>
                    <Text style={styles.intensityText}>
                      Intensity Distribution
                    </Text>
                  </View>
                  <Text style={styles.cardContent}>
                    {
                      data?.analysis?.false_color_analysis
                        ?.intensity_distribution
                    }
                  </Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Heatmap Analysis</Text>
                  <View
                    style={[
                      styles.intensityContainer,
                      {width: normalize(110)},
                    ]}>
                    <Text style={styles.intensityText}>HeatMap Zones</Text>
                  </View>
                  {data?.analysis?.heatmap_analysis?.heatmap_zones?.map(
                    item => (
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: normalize(5),
                          width: '95%',
                        }}>
                        <Text style={{color: '#fff', top: normalize(5)}}>
                          {'* '}
                        </Text>
                        <Text style={styles.cardContent}>{item}</Text>
                      </View>
                    ),
                  )}
                  <View
                    style={[
                      styles.intensityContainer,
                      {width: normalize(120)},
                    ]}>
                    <Text style={styles.intensityText}>HeatMap Summary</Text>
                  </View>
                  <Text style={styles.cardContent}>
                    {data?.analysis?.heatmap_analysis?.heatmap_summary}
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    {'Hypothetical Lighting Setup'}
                  </Text>
                  {data?.analysis?.hypothetical_lighting_setup?.map(item => (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: normalize(5),
                        width: '95%',
                      }}>
                      <Text style={{color: '#fff', top: normalize(5)}}>
                        {'* '}
                      </Text>
                      <Text style={styles.cardContent}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{'Directions'}</Text>
                  {data?.analysis?.direction?.map(item => (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: normalize(5),
                        width: '95%',
                      }}>
                      <Text style={{color: '#fff', top: normalize(5)}}>
                        {'* '}
                      </Text>
                      <Text style={styles.cardContent}>
                        {item.source_type} - {item.source_name} -{' '}
                        {item.direction}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    {'Lighting Condition Verdict'}
                  </Text>
                  <Text style={styles.cardContent}>
                    {data?.analysis?.lighting_condition_verdict}
                  </Text>
                </View>
              </View>
            </ScrollView>
          ) : (
            <>
              <View style={{flex: 1}}>
                {real || heat ? (
                  <Image
                    style={styles.fullImage}
                    onLoad={handleImageLoad}
                    source={{
                      uri: !falseImage ? `${real}` : `${heat}`,
                    }}
                  />
                ) : null}

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handleFullscreen}
                  style={{
                    position: 'absolute',
                    backgroundColor: '#2E3131',
                    width: normalize(35),
                    height: normalize(35),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: normalize(100),
                    right: normalize(20),
                    top: normalize(20),
                  }}>
                  <Image
                    source={image.fullScreen}
                    style={{
                      height: undefined,
                      width: normalize(24),
                      aspectRatio: 1,
                    }}
                  />
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={viewFalseImage}
                    style={[
                      styles.viewFalseImageButton,
                      isImageLoading && {opacity: 0.5},
                    ]}
                    disabled={isImageLoading}>
                    <Text style={styles.viewFalseImageText}>
                      {!falseImage ? `View False Image` : 'View Original Image'}
                    </Text>
                    <View style={styles.arrowContainer}>
                      <Image source={icons.arrow} style={styles.arrowIcon} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Analysis;
