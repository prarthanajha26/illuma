import {StyleSheet} from 'react-native';
import {normalize, vh, vw} from '../../utils/dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: vw(100),
    aspectRatio: 0.5,
  },
  loadingContainer: {
    paddingBottom: vh(50),
    flexDirection: 'row',
    gap: normalize(10),
    alignItems: 'center',
  },
  loadingText: {
    fontSize: normalize(17),
    fontWeight: normalize(400),
    color: '#fff',
  },
});

export default styles;
