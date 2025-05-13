import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {fonts, icons, image} from '../../assets';
import {normalize} from '../../utils/dimension';
import {Accordion} from '../../components/Accordion';
import {screenNames} from '../../navigator/screenName';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSubscriptionRequest} from '../../redux/action/subscriptionAction';
import {getUserDataRequest} from '../../redux/action/getUserdata';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const SubscriptionScreen = ({navigation}) => {
  // Subscription data
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.subscription);
  const {userData} = useSelector(state => state.getUserData);
  const [profileData, setProfileData] = useState();

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
        dispatch(fetchSubscriptionRequest());
        dispatch(getUserDataRequest(profileData?.data?.user?.email));
      }
    }, [profileData, dispatch]),
  );

  if (loading || !data || !userData) {
    return (
      <SafeAreaView style={styles.LoaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loaderText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentPlan = data?.data[userData?.data?.subscription?.id];

  const currentPlanId = userData?.data?.subscription?.id;

  const availablePlans = Object.keys(data?.data).filter(key => {
    if (
      (currentPlanId === 'premium' || currentPlanId === 'basic') &&
      key === 'free'
    ) {
      return false;
    }
    return key !== currentPlanId;
  });

  const handleRestore = () => {
    // SKPaymentQueue.default().restoreCompletedTransactions();
  };

  const renderPlan = ({item}) => {
    const plan = data?.data[item];

    return (
      <Accordion
        AccordionContainer={{marginBottom: 20}}
        header={() => (
          <View style={styles.planCard}>
            <View style={styles.CurrentPlanIconContainer}>
              <Image
                source={
                  item === 'basic'
                    ? image.basicActive
                    : item === 'free'
                    ? image.freeActive
                    : image.premiumActive
                }
                style={{height: normalize(24), width: normalize(24)}}
              />
            </View>
            <View style={styles.planDetails}>
              <Text style={styles.planTitle}>{plan.name}</Text>
              <Text style={styles.planDescription}>{plan.desc1}</Text>
            </View>
            <Image
              source={icons.dropdown}
              style={{
                height: undefined,
                width: normalize(24),
                aspectRatio: 1,
              }}
            />
          </View>
        )}
        onAccordianPress={() => {}}
        isHeaderVisible={true}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={
                item === 'basic'
                  ? image.basicCrown
                  : item === 'free'
                  ? image.freeRocket
                  : image.premiumStar
              }
              style={{height: normalize(25), width: normalize(25)}}
            />
            <Image
              source={image.dropDownOpen}
              style={{height: normalize(30), width: normalize(30)}}
            />
          </View>
          <Text style={styles.title}>{plan.name}</Text>
          <View style={styles.featureContainer}>
            <Image
              source={image.tick}
              style={{
                height: normalize(14),
                width: undefined,
                aspectRatio: 1,
                tintColor: 'white',
              }}
            />
            <Text style={[styles.featureText, {color: '#fff'}]}>
              {plan.desc1}
            </Text>
          </View>
          <View style={styles.featureContainer}>
            <Image
              source={image.tick}
              style={{
                height: normalize(14),
                width: undefined,
                aspectRatio: 1,
                tintColor: 'white',
              }}
            />
            <Text style={[styles.featureText, {color: '#fff'}]}>
              {plan.desc2}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(50),
              marginBottom: normalize(20),
            }}>
            <Text style={styles.price}>${plan.price}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screenNames.ManagePlan, {
                  subscription: true,
                  plan: currentPlan,
                  subscribeTo: plan,
                  email: profileData?.data?.user?.email,
                })
              }
              style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Subscribe</Text>
              <Image
                source={icons.arrow}
                style={{height: normalize(15), width: normalize(15)}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Accordion>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              dispatch(fetchSubscriptionRequest());
              dispatch(getUserDataRequest(profileData?.data?.user?.email));
            }}
          />
        }>
        <View style={{padding: normalize(20)}}>
          <Text style={styles.header}>Subscription Plans</Text>

          {/* Current Plan */}
          <View style={styles.currentPlanCard}>
            <View style={styles.currentPlanHeader}>
              <View style={styles.planIconContainer}>
                <Image
                  source={
                    currentPlan.id === 'basic'
                      ? image.basicCrown
                      : currentPlan.id === 'free'
                      ? image.freeRocket
                      : image.premiumStar
                  }
                  style={{height: normalize(25), width: normalize(25)}}
                />
              </View>
              <TouchableOpacity style={styles.currentPlanBadge}>
                <Text style={styles.currentPlanBadgeText}>• Current Plan</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.currentPlanTitle}>{currentPlan.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: normalize(10),
              }}>
              <Image
                source={image.tick}
                style={{
                  height: normalize(14),
                  width: undefined,
                  aspectRatio: 1,
                }}
              />
              <Text style={styles.featureText}> {currentPlan.desc1}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: normalize(10),
              }}>
              <Image
                source={image.tick}
                style={{
                  height: normalize(14),
                  width: undefined,
                  aspectRatio: 1,
                }}
              />
              <Text style={styles.featureText}> {currentPlan.desc2}</Text>
            </View>
            <View style={styles.currentPlanFooter}>
              <Text style={styles.currentPlanPrice}>${currentPlan.price}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screenNames.ManagePlan, {
                    subscription: false,
                    plan: currentPlan,
                    subscriptionData: userData?.data?.subscription,
                    email: profileData?.data?.user?.email,
                  })
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.managePlanText}>Manage Plan </Text>
                <Image
                  source={icons.forward}
                  style={{
                    height: undefined,
                    width: normalize(24),
                    aspectRatio: 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Active Plans */}
          <Text style={styles.subHeader}>Available Plans</Text>
          <FlatList
            data={availablePlans}
            renderItem={renderPlan}
            keyExtractor={item => item}
            style={styles.planList}
          />
        </View>
        {/* <TouchableOpacity onPress={handleRestore}>
          <Text style={{color: 'white'}}>Restore Button</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#fff',
    fontSize: normalize(24),
    fontWeight: 'bold',
    textAlign: 'center',

    fontFamily: fonts.InstrumentSem,
  },
  currentPlanCard: {
    backgroundColor: '#FFC107',
    borderRadius: normalize(42),
    padding: normalize(29),
    marginBottom: normalize(24),
    marginTop: normalize(20),
  },
  currentPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(25),
  },
  currentPlanBadge: {
    borderWidth: 1,
    borderColor: '#242424',
    borderRadius: normalize(16),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
  },
  currentPlanBadgeText: {
    color: '#242424',
    fontSize: normalize(12),
    fontWeight: '400',
    fontFamily: fonts.HammerRegular,
  },
  currentPlanTitle: {
    color: '#1c1c1c',
    fontSize: normalize(30),
    fontWeight: '600',
    marginTop: normalize(20),
    marginBottom: normalize(10),
    fontFamily: fonts.InterSemiBold,
  },
  featureText: {
    color: '#000',
    fontSize: normalize(15),
    fontWeight: '400',
    marginVertical: normalize(5),
    fontFamily: fonts.InstrumentReg,
  },
  currentPlanFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: normalize(50),
  },
  currentPlanPrice: {
    color: '#1c1c1c',
    fontSize: normalize(29),
    fontWeight: '400',
    fontFamily: fonts.InterReg,
  },
  managePlanText: {
    color: '#1c1c1c',
    fontSize: normalize(14),
    fontWeight: '500',
    fontFamily: fonts.InterReg,
  },
  subHeader: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: normalize(8),
    fontFamily: fonts.InterSemiBold,
  },
  planList: {
    marginBottom: normalize(16),
  },
  planCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: normalize(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(16),
  },
  planIconContainer: {
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(18),
    height: normalize(60),
    width: normalize(60),
    marginRight: normalize(16),
  },
  CurrentPlanIconContainer: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(50),
    backgroundColor: '#FFBF00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(16),
  },
  planDetails: {
    flex: 1,
  },
  planTitle: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  planDescription: {
    color: '#aaa',
    fontSize: normalize(14),
    marginTop: normalize(5),
  },
  card: {
    backgroundColor: '#333333',
    borderRadius: normalize(16),
    padding: normalize(20),
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: normalize(20),
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(5),
    gap: normalize(10),
  },
  price: {
    fontSize: normalize(28),
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: fonts.InterSemiBold,
  },
  subscribeButton: {
    borderColor: '#FFBF00',
    borderWidth: 1,
    borderRadius: normalize(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(10),
    paddingHorizontal: normalize(20),
  },
  subscribeText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: '#FFBF00',
    fontFamily: fonts.HammerRegular,
  },
});

export default SubscriptionScreen;
