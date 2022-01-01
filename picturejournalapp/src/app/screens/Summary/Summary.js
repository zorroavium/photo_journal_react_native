import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Geolocation from '../../utils/geolocation';

export default function Summary() {
  return (
    <View style={styles.container}>
      <Text>Summary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
