import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {normalize} from '../../utils/dimension';
import {icons} from '../../assets';

const ButtonArrow = ({
  buttonTitle,
  buttonSubTitle,
  backgroundColor = '#FFBF00',
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.container,
        {containerStyle},
        {backgroundColor: backgroundColor},
      ]}>
      <View>
        <Text style={styles.title}>{buttonTitle}</Text>
        <Text style={styles.subTitle}>{buttonSubTitle}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Image source={icons.arrow} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonArrow;

const styles = StyleSheet.create({
  container: {
    height: normalize(100),
    width: normalize(380),
    backgroundColor: '#FFBF00',
    borderRadius: normalize(27),
    marginTop: normalize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: normalize(20),
  },
  title: {
    fontSize: normalize(19),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: normalize(12),
    fontWeight: '600',
    color: '#747474',
  },
  arrowContainer: {
    backgroundColor: '#2E3131',
    height: normalize(43),
    width: normalize(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(100),
    marginRight: normalize(20),
    marginVertical: normalize(8),
  },
  arrowIcon: {
    height: normalize(24),
    width: normalize(24),
  },
});
