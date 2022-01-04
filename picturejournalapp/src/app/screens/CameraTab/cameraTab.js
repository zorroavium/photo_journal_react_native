import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CameraTab = () => {
  
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>Camera Tab</Text>
    </View>
  );
}

export default CameraTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
