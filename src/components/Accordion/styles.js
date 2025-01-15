import {StyleSheet} from 'react-native';
import {normalize, vh} from '../../utils/dimension';

const styles = StyleSheet.create({
  AccordianContainer: {
    borderRadius: normalize(6),
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    width: '100%',
    borderRadius: normalize(10),
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: normalize(10),
    borderRadius: normalize(5),
  },
  buttonText: {
    color: '#fff',
    fontSize: normalize(16),
  },
  dropdown: {
    marginTop: normalize(10),
    backgroundColor: '#f8f8f8',
    padding: normalize(10),
    borderRadius: normalize(5),
    width: vh(200),
  },
  dropdownItem: {
    fontSize: normalize(16),
    paddingVertical: normalize(10),
  },
  // childrenContainer: {justifyContent: 'space-evenly', height: 200}
});

export default styles;
