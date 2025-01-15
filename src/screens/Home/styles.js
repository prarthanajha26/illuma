import {StyleSheet} from 'react-native';
import {normalize} from '../../utils/dimension';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#131313',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(27),
  },
  mainView: {
    paddingBottom: normalize(40),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flexDirection: 'row',
  },
  greetingText: {
    color: '#FFBF00',
    fontSize: normalize(30),
    fontWeight: '600',
  },
  userNameText: {
    color: 'white',
    fontSize: normalize(30),
    fontWeight: '600',
  },
  avatar: {
    height: normalize(50),
    width: normalize(50),
    backgroundColor: 'red',
    borderRadius: normalize(100),
  },
  falseColorMap: {
    marginTop: normalize(50),
  },
  falseColorMapTitle: {
    color: 'white',
    fontSize: normalize(19),
    fontWeight: '600',
  },
  falseColorMapSubtitle: {
    fontSize: normalize(12),
    fontWeight: '600',
    color: '#747474',
  },
  imagePickerContainer: {
    alignItems: 'center',
    paddingTop: normalize(20),
  },
  imagePickerBox: {
    height: normalize(400),
    width: normalize(380),
    backgroundColor: '#272727',
    borderRadius: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerInner: {
    height: normalize(400),
    width: normalize(380),
    backgroundColor: '#272727',
    borderRadius: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: 'white',
    marginTop: normalize(28),
  },
  uploadSubtitle: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: 'white',
    lineHeight: 21,
  },
  dashedBorder: {
    height: normalize(250),
    width: normalize(300),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FFBF00',
    borderRadius: normalize(38),
    marginTop: normalize(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: normalize(55),
    height: undefined,
    aspectRatio: 1,
  },
  uploadDescription: {
    textAlign: 'center',
    width: '75%',
    color: 'white',
    flexWrap: 'wrap',
  },
  browseButton: {
    padding: normalize(20),
    backgroundColor: '#FFBF00',
    borderRadius: normalize(16),
    marginTop: normalize(20),
  },
  browseButtonText: {
    fontSize: normalize(15),
    fontWeight: '700',
  },
  imagePreviewContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  selectedImage: {
    height: undefined,
    width: normalize(380),
    aspectRatio: normalize(380) / normalize(400),
    backgroundColor: 'green',
    resizeMode: 'cover',
    borderRadius: normalize(15),
  },
  generateButton: {
    position: 'absolute',
    width: normalize(300),
    paddingLeft: normalize(30),
    backgroundColor: '#FFBF00',
    borderRadius: normalize(34),
    bottom: normalize(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  generateButtonText: {
    fontSize: normalize(13),
    fontWeight: '400',
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
  activityIndicator: {
    position: 'absolute',
  },
});

export default styles;
