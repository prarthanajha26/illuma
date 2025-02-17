import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts, image} from '../../assets';
import {normalize} from '../../utils/dimension';

import {screenNames} from '../../navigator/screenName';

import {useNavigation} from '@react-navigation/native';

const BookmarkLogCard = ({item, email, cardNav}) => {
  const navigation = useNavigation();

  const [date, time] = item.timestamp.split('T');
  const formattedTime = time.slice(0, 5);

  const handleNavigation = () => {
    navigation.navigate(screenNames.Analysis, {
      data: item,
      email: email,
      cardNav: cardNav,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={[styles.card, {backgroundColor: '#484848'}]}>
      <Text
        style={[styles.title, {color: '#FFBF00'}]}
        numberOfLines={2}
        ellipsizeMode="tail">
        {item.analysis.title}
      </Text>
      {item.timestamp ? (
        <Text style={styles.date}>
          {date}@ {formattedTime}
        </Text>
      ) : null}
      {item.image ? (
        <View style={{marginTop: normalize(20)}}>
          <Image
            style={styles.heatmapImage}
            source={{
              uri: item.false_image,
            }}
          />

          <Image
            style={styles.selectedImage}
            source={{
              uri: item.image,
            }}
          />
        </View>
      ) : null}
      <TouchableOpacity style={styles.button}>
        <Image
          source={image.diagonalArrow}
          style={{height: normalize(25), width: normalize(25)}}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default BookmarkLogCard;

const styles = StyleSheet.create({
  card: {
    margin: normalize(5),
    borderRadius: normalize(28),
    padding: normalize(15),
    alignItems: 'flex-start',
    height: normalize(283),
    width: '47%',
  },
  title: {
    fontSize: normalize(27),
    fontFamily: fonts.InstrumentSem,
    color: '#fff',
  },
  date: {
    fontSize: normalize(14),
    color: '#fff',
    marginTop: normalize(5),
    fontFamily: fonts.InstrumentSem,
  },

  image: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    marginTop: normalize(10),
  },

  button: {
    position: 'absolute',
    bottom: normalize(15),
    right: normalize(15),
    backgroundColor: '#FFC107',
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: normalize(18),
    color: '#000',
    fontWeight: 'bold',
  },
  selectedImage: {
    position: 'absolute',
    height: normalize(72),
    width: normalize(72),
    borderRadius: normalize(100),
    left: normalize(20),
  },
  heatmapImage: {
    height: normalize(72),
    width: normalize(72),
    borderRadius: normalize(100),
  },
});
