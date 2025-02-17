import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProgressBar = ({
  subscriptionData,
  backBarColor,
  upperBarColor,
  limit,
}) => {
  // Calculate progress percentage
  let progress = 0;
  if (subscriptionData?.id === 'premium') {
    progress = 100;
  } else if (subscriptionData?.id === 'basic') {
    progress = (subscriptionData?.tokens / limit) * 100;
  } else {
    progress =
      subscriptionData?.tokens === 0
        ? 0
        : (subscriptionData?.tokens / limit) * 100;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progressBar,
          {backgroundColor: backBarColor ? backBarColor : '#333'},
        ]}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress}%`,
              backgroundColor: upperBarColor ? upperBarColor : '#FFBF00',
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    // backgroundColor: '#000',
    borderRadius: 8,
    width: '100%',
    alignSelf: 'center',
  },
  usageText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
  },
  largeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  smallText: {
    fontSize: 16,
    color: '#FFF',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ProgressBar;
