import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {normalize} from '../../utils/dimension';
import {fonts, image} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getActivityDataRequest} from '../../redux/action/getActivityLogAction';
import BookmarkLogCard from '../../components/BookmarkLogCard';
// import {useFocusEffect} from '@react-navigation/native';
import {screenNames} from '../../navigator/screenName';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Notification = ({navigation}) => {
  const {activityData, activeError, activeLoading} = useSelector(
    state => state.getActivityData,
  );
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState();
  const [page, setPage] = useState(1);
  const {userData} = useSelector(state => state.getUserData);

  useEffect(() => {
    const getToken = async () => {
      try {
        const result = await AsyncStorage.getItem('token');
        setProfileData(JSON.parse(result));
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };
    getToken();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (profileData?.data?.user?.email && !activeLoading) {
  //       dispatch(getActivityDataRequest(profileData?.data?.user?.email, page));
  //     } else {
  //       console.log('No email or loading in progress');
  //     }
  //   }, [profileData, dispatch, page]),
  // );

  useEffect(() => {
    if (userData?.data?.email) {
      dispatch(getActivityDataRequest(userData?.data?.email, page));
    }
  }, [profileData, dispatch]);

  const firstItem = activityData?.data[0];
  const remainingData = activityData?.data.slice(1);

  return (
    <View style={styles.activityLogContainer}>
      <Text
        style={{
          color: '#fff',
          fontSize: normalize(24),
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: insets.top,
          marginBottom: normalize(20),
          fontFamily: fonts.InstrumentSem,
        }}>
        Activity Log
      </Text>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={activeLoading}
            onRefresh={() => {
              dispatch(getActivityDataRequest(userData?.data?.email, page));
            }}
          />
        }>
        <View style={{flexDirection: 'row'}}>
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
              email={userData?.data?.email}
              cardNav={true}
            />
          )}
        </View>
        <FlatList
          data={remainingData}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <BookmarkLogCard
              email={userData?.data?.email}
              item={item}
              cardNav={true}
            />
          )}
          ListEmptyComponent={
            !activeLoading && !activityData?.data ? (
              <Text style={styles.emptyText}>No activity data available.</Text>
            ) : null
          }
          ListHeaderComponent={
            activeLoading && activityData?.next_page !== -1 ? (
              <ActivityIndicator size="large" color="#FFBF00" />
            ) : null
          }
        />
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
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
  title: {
    fontSize: normalize(27),
    fontFamily: fonts.InstrumentSem,
    color: '#fff',
  },
  activityLogContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingTop: normalize(20),
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
});
