import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {analysisData} from '../../../utils/analysisData';
import {normalize} from '../../../utils/dimension';
import {icons, image} from '../../../assets';

const Analysis = props => {
  const {data} = props?.route?.params;
  const [falseImage, setFalseImage] = useState(false);
  const [fullScreen, setfullScreen] = useState(false);
  // analysisData.image.url = selectedImage;
  // console.log(data.analysis.light_source_analysis, 'datadata');
  const [date, time] = data.timestamp.split('T');
  const formattedTime = time.slice(0, 5);

  const viewFalseImage = () => {
    setFalseImage(prev => !prev);
  };

  const handleFullscreen = () => {
    setfullScreen(prev => !prev);
  };
  const handleBookmark = () => {
    console.log('bookmark');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {!fullScreen ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.navigation.goBack()}
              style={styles.backButton}>
              <Image source={icons.leftArrow} style={styles.backButtonImage} />
              <Text style={styles.backButtonText}> Back to Home</Text>
            </TouchableOpacity>

            <View style={styles.analysisHeader}>
              <Text style={styles.analysisTitle}>Analysis Summary</Text>
              <Image source={image.bookMark} style={styles.bookMarkIcon} />
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {date} @ {formattedTime}
              </Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: falseImage ? data.heatmap_data : data.false_image,
                }}
                style={styles.selectedImage}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={viewFalseImage}
                style={styles.viewFalseImageButton}>
                <Text style={styles.viewFalseImageText}>
                  {!falseImage ? `View False Image` : 'View Orignal Image'}
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
                {data.analysis.description}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>{'Light Source Analysis'}</Text>
              {data.analysis.light_source_analysis.map((item, index) => (
                <Text key={index} style={styles.lightSourceDetail}>
                  {'• '}
                  {item}
                </Text>
              ))}
              {/* {analysisData.light_source_analysis.summary.map((item, index) => (
                <View key={index} style={styles.lightSourceDescription}>
                  <Text style={styles.dateText}>
                    {item.type} - {item.direction} - {item.angle}
                  </Text>
                </View>
              ))} */}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {'lighting_condition_verdict'}
              </Text>
              <Text style={styles.cardContent}>
                {data.analysis.lighting_condition_verdict}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>false_color_analysis</Text>
              {data.analysis.false_color_analysis.zones.map(item => (
                <Text style={styles.cardContent}>{item}</Text>
              ))}
              <Text style={styles.cardTitle}>Intensity Destribution</Text>
              <Text style={styles.cardContent}>
                {data.analysis.false_color_analysis.intensity_distribution}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Heatmap Analysis</Text>
              {data.analysis.heatmap_analysis.heatmap_zones.map(item => (
                <Text style={styles.cardContent}>{item}</Text>
              ))}
              <Text style={styles.cardTitle}>Heatmap Summary</Text>
              <Text style={styles.cardContent}>
                {data.analysis.heatmap_analysis.heatmap_summary}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <>
          <View style={{flex: 1}}>
            <Image
              source={{
                uri: falseImage ? data.heatmap_data : data.falseImage,
              }}
              style={{flex: 1}}
            />
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
                style={[styles.viewFalseImageButton]}>
                <Text style={styles.viewFalseImageText}>
                  {!falseImage ? `View False Image` : 'View Orignal Image'}
                </Text>
                <View style={styles.arrowContainer}>
                  <Image source={icons.arrow} style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#131313',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(27),
  },
  container: {
    // paddingHorizontal: normalize(40),
    paddingBottom: normalize(35),
  },
  backButton: {
    flexDirection: 'row',
  },
  backButtonImage: {
    height: normalize(20),
    width: normalize(20),
  },
  backButtonText: {
    color: '#fff',
  },
  analysisHeader: {
    marginTop: normalize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analysisTitle: {
    color: '#fff',
    fontSize: normalize(23),
    fontWeight: '700',
  },
  bookMarkIcon: {
    height: normalize(24),
    width: normalize(24),
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: '#FFBF00',
    width: normalize(157),
    height: normalize(31),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(20),
    marginTop: normalize(20),
  },
  lightSourceDescription: {
    borderWidth: 1,
    borderColor: '#FFBF00',
    borderRadius: normalize(20),
    marginTop: normalize(20),
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  lightSourceDetail: {
    fontSize: normalize(13),
    fontWeight: '400',
    color: '#fff',
    marginBottom: normalize(10),
  },
  dateText: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '400',
  },
  imageContainer: {
    marginTop: normalize(20),
    borderRadius: normalize(15),
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: normalize(25),
  },
  selectedImage: {
    height: undefined,
    width: normalize(328),
    aspectRatio: 0.68,
    resizeMode: 'cover',
  },
  viewFalseImageButton: {
    position: 'absolute',
    width: normalize(220),
    paddingLeft: normalize(30),
    backgroundColor: '#FFBF00',
    borderRadius: normalize(34),
    bottom: normalize(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: normalize(10),
  },
  viewFalseImageText: {
    fontSize: normalize(13),
    fontWeight: '400',
    width: '70%',
  },
  arrowContainer: {
    backgroundColor: '#2E3131',
    height: normalize(43),
    width: normalize(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(100),
    marginRight: normalize(10),
    marginVertical: normalize(8),
  },
  arrowIcon: {
    height: normalize(24),
    width: normalize(24),
  },
  card: {
    padding: normalize(20),
    borderWidth: 1,
    borderColor: '#484848',
    borderRadius: normalize(16),
    marginBottom: normalize(20),
  },
  cardTitle: {
    fontSize: normalize(13),
    fontWeight: '600',
    color: '#5E5E5E',
    lineHeight: normalize(21),
    marginTop: normalize(8),
  },
  cardContent: {
    fontSize: normalize(13),
    fontWeight: '400',
    color: '#fff',
    marginTop: normalize(4),
    marginBottom: normalize(5),
  },
});
