import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {icons, image} from '../../assets';
import {normalize} from '../../utils/dimension';
import {Accordion} from '../../components/Accordion';
import {screenNames} from '../../navigator/screenName';

const SubscriptionScreen = ({navigation, route}) => {
  // Subscription data
  const subscription = {
    basic: {
      desc1: '50 tokens',
      desc2: 'Access to all app features',
      id: 'basic',
      name: 'Basic package',
      price: 4.9,
      token_limit: {limit: '50', type: 'fixed'},
    },
    free: {
      desc1: '50 tokens',
      desc2: 'Access to all app features',
      id: 'free',
      name: 'Free package',
      price: 0.0,
      token_limit: {limit: '50', type: 'fixed'},
    },
    premium: {
      desc1: 'Unlimited tokens',
      desc2: 'Access to all app features',
      id: 'premium',
      name: 'Premium package',
      price: 9.9,
      token_limit: {limit: 'unlimited', type: 'fixed'},
    },
  };

  const currentPlanIdFromRoute = route?.params?.currentPlanId || 'basic';
  const currentPlan = subscription[currentPlanIdFromRoute];

  const availablePlans = Object.keys(subscription).filter(
    key => key !== currentPlanIdFromRoute,
  );

  const renderPlan = ({item}) => {
    const plan = subscription[item];

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
            <Text style={styles.featureText}>{plan.desc1}</Text>
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
            <Text style={styles.featureText}>{plan.desc2}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: normalize(15),
            }}>
            <Text style={styles.price}>${plan.price}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screenNames.ManagePlan, {
                  subscription: true,
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
      <ScrollView>
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
          <Text style={styles.subHeader}>Active Plans</Text>
          <FlatList
            data={availablePlans}
            renderItem={renderPlan}
            keyExtractor={item => item}
            style={styles.planList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#fff',
    fontSize: normalize(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: normalize(16),
  },
  currentPlanCard: {
    backgroundColor: '#FFC107',
    borderRadius: normalize(42),
    padding: normalize(29),
    marginBottom: normalize(24),
  },
  currentPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  currentPlanTitle: {
    color: '#1c1c1c',
    fontSize: normalize(30),
    fontWeight: '600',
    marginVertical: normalize(20),
  },
  featureText: {
    color: '#fff',
    fontSize: normalize(15),
    fontWeight: '400',
    marginVertical: normalize(9),
  },
  currentPlanFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(30),
  },
  currentPlanPrice: {
    color: '#1c1c1c',
    fontSize: normalize(29),
    fontWeight: '400',
  },
  managePlanText: {
    color: '#1c1c1c',
    fontSize: normalize(14),
    fontWeight: '500',
  },
  subHeader: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: normalize(8),
  },
  planList: {
    marginBottom: normalize(16),
  },
  planCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(16),
  },
  planIconContainer: {
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(24),
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
    marginBottom: normalize(10),
    gap: normalize(10),
  },
  price: {
    fontSize: normalize(28),
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  },
});

export default SubscriptionScreen;
