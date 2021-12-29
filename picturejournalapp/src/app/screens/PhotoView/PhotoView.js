import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function PhotoView() {
  return (
    <View style={styles.container}>
      <Text>Photo View</Text>
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
