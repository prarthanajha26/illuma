import {StyleSheet} from 'react-native';
import {normalize} from '../../utils/dimension';
import {fonts} from '../../assets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    paddingHorizontal: normalize(24),
  },
  centered: {
    alignItems: 'center',
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(30),
  },
  logo: {
    width: normalize(22),
    height: undefined,
    aspectRatio: normalize(22) / normalize(31),
  },
  getStartedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#31302F',
    width: normalize(150),
    height: normalize(42),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(22),
    marginTop: normalize(30),
  },
  getStartedText: {
    color: '#fff',
    fontSize: normalize(17),
    fontWeight: '600',
  },
  signupTitle: {
    color: '#fff',
    fontSize: normalize(23),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: normalize(20),
  },
  signupDescription: {
    color: '#fff',
    fontSize: normalize(13),
    fontWeight: '600',
    marginTop: normalize(20),
  },
  googleButton: {
    flexDirection: 'row',
    height: normalize(52),
    width: '100%',
    backgroundColor: '#31302F',
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(40),
    gap: normalize(20),
  },
  googleIcon: {
    width: normalize(28),
    height: undefined,
    aspectRatio: 1,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  orDivider: {
    borderWidth: 1,
    borderColor: '#5E5E5E',
    width: normalize(130),
    height: normalize(0),
  },
  orText: {
    color: '#5E5E5E',
    fontWeight: '600',
    fontSize: normalize(13),
    paddingHorizontal: normalize(10),
  },
  inputContainer: {
    marginTop: normalize(30),
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAA8A8',
    borderRadius: normalize(13),
    padding: normalize(20),
    backgroundColor: '#484848',
    color: '#fff',
  },
  emailinput: {
    borderWidth: 1,
    borderColor: '#AAA8A8',
    borderRadius: normalize(13),
    padding: normalize(20),
    backgroundColor: '#484848',
    marginTop: normalize(20),
    color: '#fff',
  },
  passwordInputContainer: {
    marginTop: normalize(20),
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: normalize(20),
  },
  eyeIcon: {
    width: normalize(25),
    height: undefined,
    aspectRatio: 1,
    color: 'red',
  },
  signupButton: {
    borderRadius: normalize(13),
    padding: normalize(20),
    marginTop: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    fontFamily: fonts.InstrumentSem,
    color: '#000',
  },
  accountQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(30),
  },
  accountQuestionText: {
    color: '#fff',
    marginBottom: normalize(20),
  },
  signupLink: {
    color: '#FFBF00',
    paddingLeft: normalize(10),
  },
  errorText: {
    color: '#FF0000',
    fontSize: normalize(12),
    marginTop: normalize(5),
    marginLeft: normalize(20),
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: 20,
  },
  mainContainer: {flex: 0.9, justifyContent: 'center'},
});

export default styles;
