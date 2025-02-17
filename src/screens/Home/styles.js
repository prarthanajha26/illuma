import {StyleSheet} from 'react-native';
import {normalize} from '../../utils/dimension';
import {fonts} from '../../assets';

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
    paddingBottom: normalize(60),
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
    fontFamily: fonts.InstrumentSem,
  },
  userNameText: {
    color: 'white',
    fontSize: normalize(30),
    fontWeight: '600',
    fontFamily: fonts.InstrumentSem,
    flex: 0.8,
  },
  avatar: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(100),
  },
  avatarImage: {
    height: normalize(50),
    width: normalize(50),
    // resizeMode: 'contain',
    borderRadius: normalize(100),
  },
  falseColorMap: {
    marginTop: normalize(50),
    alignItems: 'center',
  },
  falseColorMapTitle: {
    color: 'white',
    fontSize: normalize(19),
    fontWeight: '600',
    textAlign: 'center',
  },
  falseColorMapSubtitle: {
    fontSize: normalize(12),
    fontWeight: '600',
    color: '#747474',
    textAlign: 'center',
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
  },
  uploadSubtitle: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: '#AAA8A8',
    lineHeight: 21,
  },
  dashedBorder: {
    height: normalize(288),
    width: normalize(335),
    borderWidth: 3,
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
    color: '#AAA8A8',
    flexWrap: 'wrap',
  },
  browseButton: {
    paddingHorizontal: normalize(38),
    paddingVertical: normalize(15),
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
    resizeMode: 'cover',
    borderRadius: normalize(15),
  },
  generateButton: {
    position: 'absolute',
    width: normalize(292),
    height: normalize(60),
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
    alignSelf: 'center',
    color: '#000',
  },
  generateButtonTextContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    backgroundColor: '#2E3131',
    height: normalize(50),
    width: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(100),
    marginRight: normalize(5),
  },
  arrowIcon: {
    height: normalize(24),
    width: normalize(24),
  },
  activityIndicator: {
    padding: normalize(100),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: normalize(400),
    backgroundColor: 'white',
    borderRadius: normalize(20),
    padding: normalize(24),
    // alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: normalize(16),
    top: normalize(30),
    zIndex: 1,
  },

  oopsText: {
    fontSize: normalize(48),
    fontWeight: 'bold',
    color: '#FFB800',
    marginBottom: normalize(8),
  },
  textContainer: {
    // alignItems: 'center',
    marginBottom: normalize(20),
  },
  title: {
    fontSize: normalize(14),
    // fontWeight: '700',
    color: '#000',
    marginBottom: normalize(8),
    fontFamily: fonts.InterBold,
  },
  subtitle: {
    fontSize: normalize(14),
    // fontWeight: '400',
    color: '#666',
    fontFamily: fonts.InterReg,
    // textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFB800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(16),
    borderRadius: normalize(12),
    width: '100%',
    gap: normalize(8),
  },
  buttonText: {
    color: '#000',
    fontSize: normalize(16),
    fontWeight: '600',
  },
  LoaderContainer: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    marginTop: normalize(20),
  },
});

export default styles;
