import { View, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

import { IMAGE_URI } from '../../config/index'

const PhotoView = ({route}) => {
  const item = route.params.itemData;

  return (
    <View style={styles.cardImgWrapper}>
      <ImageBackground
        source={{uri: IMAGE_URI(item?.image)}}
        resizeMode="cover"
        style={styles.image}></ImageBackground>
    </View>
  );
};

export default PhotoView;

const styles = StyleSheet.create({
  cardImgWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    height: 250,
  }
});
