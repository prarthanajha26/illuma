import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {fonts, icons, image} from '../../../assets';
import {isIOS, normalize} from '../../../utils/dimension';
import ProgressBar from '../../../components/ProgressBar';
import {fetchPaymentUrl} from '../../../redux/saga/paymentSaga';
import {screenNames} from '../../../navigator/screenName';
import WebView from 'react-native-webview';
import {initConnection} from 'react-native-iap';
import {
  fetchProducts,
  initIAPConnection,
  purchaseProduct,
} from '../../../services/iapService';
import {useDispatch} from 'react-redux';
import {updateSubscriptionReq} from '../../../redux/action/updateSubscription';

const ManagePlanScreen = ({navigation, route}) => {
  const {subscription, plan, subscriptionData, subscribeTo, email} =
    route?.params || {};

  const [checkoutUrl, setCheckoutUrl] = useState(null); // Store the checkout URL
  const [showWebView, setShowWebView] = useState(false); // State to show WebView
  const [paymentStatus, setPaymentStatus] = useState(null);
  const dispatch = useDispatch();

  let formattedDate = '';
  if (subscriptionData !== undefined && subscriptionData?.end_date) {
    const [date, time] = subscriptionData?.end_date?.split('T');
    const dateObject = new Date(date);

    formattedDate = dateObject
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
      })
      .replace(' ', '-')
      .toLowerCase();
  }

  const initilizeConnection = async () => {
    const result = await initIAPConnection();
    if (result) {
      const result = await fetchProducts();
    }
  };
  useEffect(() => {
    initilizeConnection();
  }, []);
  const handlePaymentForIos = async productName => {
    try {
      await initConnection();
      if (productName === 'premium') {
        const result = await purchaseProduct('com.IllumaPremium');
        if (result) {
          dispatch(
            updateSubscriptionReq({email: email, subscription_id: productName}),
          );
        }
      } else {
        const result = await purchaseProduct('com.illumaBasics');
        if (result) {
          dispatch(
            updateSubscriptionReq({email: email, subscription_id: productName}),
          );
        }
      }
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const handlePayment = async () => {
    if (!subscription) {
      navigation.navigate(screenNames.Subscription);
    } else {
      if (isIOS) {
        handlePaymentForIos(subscribeTo?.id);
      } else {
        const data = await fetchPaymentUrl(email, subscribeTo?.id);
        setCheckoutUrl(data.checkout_url);
        setShowWebView(true);
      }
    }
  };

  const handleRenewPlan = async () => {
    if (isIOS) {
      handlePaymentForIos(plan.id);
    } else {
      const data = await fetchPaymentUrl(email, plan.id);
      setCheckoutUrl(data.checkout_url);
      setShowWebView(true);
    }
  };

  if (showWebView && checkoutUrl) {
    const injectedJavaScript = `
    setTimeout(() => {
      const element = document.querySelector("h1.text-2xl.font-semibold.text-gray-800.mt-4");
      if (element) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ payment: element.innerText.trim() }));
      }
    }, 1000);
  `;

    return (
      <SafeAreaView style={styles.container}>
        <WebView
          source={{uri: checkoutUrl}}
          startInLoadingState={true}
          style={{flex: 1}}
          injectedJavaScript={injectedJavaScript}
          onMessage={event => {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.payment === 'Payment Successful!') {
              navigation.navigate(screenNames.Subscription);
            } else {
              setCheckoutUrl(''); // Update the checkout URL
              setShowWebView(false);
            }
            console.log('Extracted Data:', data);
            setPaymentStatus(data);
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={icons.leftArrow} style={styles.backButtonImage} />
          <Text style={styles.backButtonText}> Back to subscription</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.screenTitle}>
            {subscription ? 'Subscribe' : 'Manage Plan'}
          </Text>

          {/* Premium Package Card */}
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                gap: normalize(10),
                marginLeft: normalize(5),
              }}>
              <Image
                source={
                  plan.id === 'basic'
                    ? image.basicCrown
                    : plan.id === 'free'
                    ? image.freeRocket
                    : image.premiumStar
                }
                style={{height: normalize(20), width: normalize(20)}}
              />
              <Text style={styles.cardTitle}>{plan.name}</Text>
            </View>
            <View style={styles.cardFeatureRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.cardFeatureText}>{plan.desc1}</Text>
            </View>
            <View style={styles.cardFeatureRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.cardFeatureText}>{plan.desc2}</Text>
            </View>
          </View>

          {/* Today's Token Usage */}
          {subscription ? (
            <View style={styles.card}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: normalize(13),
                  fontWeight: '600',
                  marginBottom: normalize(16),
                }}>
                Subscribe to
              </Text>
              <View style={styles.cardHeader}>
                <Image
                  source={
                    subscribeTo?.id === 'basic'
                      ? image.basicCrown
                      : subscribeTo?.id === 'free'
                      ? image.freeRocket
                      : image.premiumStar
                  }
                  style={{height: normalize(20), width: normalize(20)}}
                />
                <Text style={styles.cardHeaderTitle}>{subscribeTo?.name}</Text>
              </View>
              <View style={styles.cardFeatureRow}>
                <View style={styles.bulletPoint} />
                <Text style={styles.cardFeatureText}>{subscribeTo?.desc1}</Text>
              </View>
              <View style={styles.cardFeatureRow}>
                <View style={styles.bulletPoint} />
                <Text style={styles.cardFeatureText}>{subscribeTo?.desc2}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: normalize(29),
                    fontWeight: '400',
                    color: '#E9B701',
                    marginTop: normalize(20),
                    fontFamily: fonts.InterReg,
                  }}>
                  ${subscribeTo?.price}
                </Text>
                {subscribeTo?.id === 'premium' && (
                  <Text
                    style={{
                      fontSize: normalize(15),
                      fontWeight: '500',
                      alignSelf: 'flex-end',
                      color: '#E9B701',
                      bottom: normalize(4),
                      fontFamily: fonts.InterReg,
                    }}>
                    /year
                  </Text>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Token Usage</Text>
              <Text style={styles.usageText}>
                {subscriptionData.id === 'premium' ? (
                  'Unlimited'
                ) : subscriptionData.id === 'basic' ? (
                  <>
                    <Text style={styles.largeText}>
                      {subscriptionData?.tokens}
                      {'/'}
                    </Text>
                    <Text style={styles.smallText}>
                      {plan.token_limit.limit}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.largeText}>
                      {subscriptionData.tokens}
                      {'/'}
                    </Text>
                    <Text style={styles.smallText}>
                      {plan.token_limit.limit}
                    </Text>
                  </>
                )}
              </Text>

              <ProgressBar
                limit={plan.token_limit.limit}
                subscriptionData={subscriptionData}
              />
            </View>
          )}

          {/* Expiration Date */}
          {!subscription && (
            <View style={styles.expiryContainer}>
              <Text style={styles.expiryText}>Expiring: {formattedDate}</Text>
            </View>
          )}

          {/* Buttons */}
          {subscribeTo?.id !== 'free' && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePayment}>
              {!subscription ? (
                <Text style={styles.primaryButtonText}>Change Plan →</Text>
              ) : (
                <Text style={styles.primaryButtonText}>
                  Proceed to pay{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    ${subscribeTo?.price}
                  </Text>{' '}
                  →
                </Text>
              )}
            </TouchableOpacity>
          )}
          {!subscription && plan.id !== 'free' && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleRenewPlan}>
              <Text style={styles.secondaryButtonText}>Renew Plan →</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    flexDirection: 'row',
    marginVertical: normalize(20),
  },
  backButtonImage: {
    height: normalize(20),
    width: normalize(20),
  },
  backButtonText: {
    color: '#fff',
    fontFamily: fonts.InstrumentSem,
    fontSize: normalize(16),
  },
  contentContainer: {
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: normalize(32),
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: normalize(30),
    fontFamily: fonts.InterSemiBold,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#484848',
    gap: normalize(7),
  },
  cardTitle: {
    color: '#fff',
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: normalize(8),
    fontFamily: fonts.InstrumentSem,
  },
  cardFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(20),
  },
  bulletPoint: {
    height: normalize(5),
    width: normalize(5),
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: normalize(15),
  },
  cardFeatureText: {
    color: '#aaa',
    fontSize: normalize(12),
    fontFamily: fonts.InstrumentSem,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: normalize(10),
  },
  cardHeaderIcon: {
    fontSize: 18,
    color: '#FFD700',
    marginRight: 8,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  usageText: {
    color: '#fff',
    fontSize: normalize(30),
    fontWeight: 'bold',
    marginBottom: normalize(8),
    fontFamily: fonts.InstrumentSem,
  },
  progressBar: {
    height: normalize(8),
    backgroundColor: '#333',
    borderRadius: normalize(4),
    overflow: 'hidden',
  },
  progress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFBF00',
  },
  expiryContainer: {
    alignItems: 'flex-start',
    marginBottom: normalize(30),
  },
  expiryText: {
    color: '#FFD700',
    fontSize: normalize(12),
    fontWeight: 'bold',
    borderColor: '#FFD700',
    borderWidth: normalize(1),
    borderRadius: normalize(14),
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(16),
    fontFamily: fonts.HammerRegular,
  },
  primaryButton: {
    backgroundColor: '#FFBF00',
    borderRadius: normalize(8),
    paddingVertical: normalize(16),
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  primaryButtonText: {
    color: '#121212',
    fontSize: normalize(16),
    fontWeight: 'bold',
    fontFamily: fonts.InterSemiBold,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: normalize(8),
    paddingVertical: normalize(16),
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  secondaryButtonText: {
    color: '#121212',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: normalize(30),
    fontFamily: fonts.InstrumentSem,
    color: '#afafaf',
  },
  smallText: {
    fontSize: normalize(13),
    fontFamily: fonts.InstrumentSem,
    color: '#afafaf',
  },
});

export default ManagePlanScreen;
