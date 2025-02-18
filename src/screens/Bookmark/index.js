import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import BookmarkLogCard from '../../components/BookmarkLogCard';
import {useDispatch, useSelector} from 'react-redux';
import {getBookmarkDataRequest} from '../../redux/action/getBookmarkAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {fonts, image} from '../../assets';
import {normalize} from '../../utils/dimension';
import {screenNames} from '../../navigator/screenName';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BookmarkScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const [page, setPage] = useState(1); // Add a state for tracking the page
  const {bookmarkData, loading} = useSelector(state => state.getBookmarData);
  const insets = useSafeAreaInsets();

  const getToken = async () => {
    try {
      const result = await AsyncStorage.getItem('token');
      setProfileData(JSON.parse(result));
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (profileData?.data?.user?.email) {
        // Initially fetch data for page 1
        dispatch(getBookmarkDataRequest(profileData?.data?.user?.email, page));
      }
    }, [profileData, dispatch, page]),
  );

  // Pagination: detect if it's the last page (less than 10 items returned)
  const handleEndReached = () => {
    if (bookmarkData.data.length >= 10) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const firstItem = bookmarkData?.data[0];
  const remainingData = bookmarkData?.data.slice(1);

  const renderItem = ({item}) => (
    <BookmarkLogCard
      item={item}
      email={profileData?.data?.user?.email}
      cardNav={true}
    />
  );

  if (loading && !bookmarkData) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#000',
        }}>
        <ActivityIndicator size="large" color={'#fff'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, {paddingTop: insets.top + normalize(20)}]}>
        Bookmarks
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={'#fff'}
            onRefresh={() => {
              dispatch(
                getBookmarkDataRequest(profileData?.data?.user?.email, page),
              );
            }}
          />
        }>
        <View style={{flexDirection: 'row', paddingHorizontal: normalize(12)}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.Home)}
            style={[styles.card, {backgroundColor: '#FFBF00'}]}>
            <Text
              style={[styles.title, {color: '#31302F'}]}
              numberOfLines={2}
              ellipsizeMode="tail">
              Continue Analysis
            </Text>

            <View style={styles.button}>
              <Image
                source={image.diagonalArrow}
                style={{
                  tintColor: '#FFBF00',
                  height: normalize(25),
                  width: normalize(25),
                }}
              />
            </View>
          </TouchableOpacity>

          {firstItem && (
            <BookmarkLogCard
              item={firstItem}
              email={profileData?.data?.user?.email}
              cardNav={true}
            />
          )}
        </View>

        <FlatList
          data={remainingData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: normalize(16),
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  header: {
    color: '#fff',
    fontSize: normalize(24),
    fontWeight: 'bold',
    textAlign: 'center',

    marginBottom: normalize(20),
    fontFamily: fonts.InstrumentSem,
  },
  list: {
    paddingHorizontal: normalize(10),
  },
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
  button: {
    position: 'absolute',
    bottom: normalize(15),
    right: normalize(15),
    backgroundColor: '#31302F',
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookmarkScreen;
