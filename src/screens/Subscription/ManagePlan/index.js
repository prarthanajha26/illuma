import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {icons} from '../../../assets';
import {normalize} from '../../../utils/dimension';

const ManagePlanScreen = ({navigation, route}) => {
  const {subscription} = route?.params;
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
          <Text style={styles.screenTitle}>Manage Plan</Text>

          {/* Premium Package Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>✨ Premium Package</Text>
            <View style={styles.cardFeatureRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.cardFeatureText}>Unlimited tokens/day</Text>
            </View>
            <View style={styles.cardFeatureRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.cardFeatureText}>
                Access to all app features
              </Text>
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
                <Text style={styles.cardHeaderIcon}>✨</Text>
                <Text style={styles.cardHeaderTitle}>Premium Package</Text>
              </View>
              <View style={styles.cardFeatureRow}>
                <View style={styles.bulletPoint} />
                <Text style={styles.cardFeatureText}>unlimited tokens/day</Text>
              </View>
              <View style={styles.cardFeatureRow}>
                <View style={styles.bulletPoint} />
                <Text style={styles.cardFeatureText}>
                  Access to all app features
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: normalize(29),
                    fontWeight: '400',
                    color: '#E9B701',
                    marginTop: normalize(20),
                  }}>
                  $49
                </Text>
                <Text
                  style={{
                    fontSize: normalize(15),
                    fontWeight: '500',
                    alignSelf: 'flex-end',
                    color: '#E9B701',
                    bottom: normalize(4),
                  }}>
                  /year
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Today's Token Usage</Text>
              <Text style={styles.usageText}>Unlimited</Text>
              <View style={styles.progressBar}>
                <View style={styles.progress} />
              </View>
            </View>
          )}

          {/* Expiration Date */}
          <View style={styles.expiryContainer}>
            <Text style={styles.expiryText}>Expiring: 15-Dec-2025</Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Change Plan →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Renew Plan →</Text>
          </TouchableOpacity>
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
  },
  backButtonImage: {
    height: normalize(20),
    width: normalize(20),
  },
  backButtonText: {
    color: '#fff',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
    fontSize: 14,
    marginBottom: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFBF00',
  },
  expiryContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  expiryText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: '#FFBF00',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  secondaryButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManagePlanScreen;
