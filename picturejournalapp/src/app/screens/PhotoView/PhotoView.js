import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const PhotoView = ({route, navigation}) => {
  debugger;
  console.log('PhotoView', route);
  // const item = route.params.itemData;
  // navigation.setOptions({tabBarVisible: false});
  // console.log('itemData', item);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to details"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default PhotoView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
