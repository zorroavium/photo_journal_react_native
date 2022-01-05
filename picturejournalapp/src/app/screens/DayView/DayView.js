import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import React, { useState, useEffect} from 'react';
import {Input} from 'react-native-elements';
import Icon from 'react-native-remix-icon';

import { IMAGE_URI } from '../../config/index'
import {stylesGlobalCards} from '../../global/style';
import Screens from '../../constants/screenConstants';

const icons = {
  temperatureIcon: 'sun-line',
  locationIcon: 'map-pin-3-line'
}

const iconColor = '#fff';

const getDayName = day => new Date(day).toString().split(' ')[1];
const getDate = day => new Date(day).toString().split(' ')[2];

const DayView = ({route, navigation}) => {
  const params = route?.params?.itemData;
  
  const [thoughts, setThoughts] = useState(null);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    if(params) {
      setItemData(params);
      setThoughts(params?.thoughts);
    }
  }, []);

  return (
    <View style={styles.cardsWrapper}>
      <TouchableOpacity
        style={styles.categoryBtn}
        onPress={() => {
          navigation.navigate(Screens.PhotoView, {itemData: params});
        }}>
        <ImageBackground
          source={{uri: IMAGE_URI(itemData?.image)}}
          resizeMode="cover"
          style={styles.image}>
          <View>
            <Text style={styles.dayName}>{getDayName(itemData?.date)}</Text>
            <Text style={styles.date}>{getDate(itemData?.date)}</Text>
          </View>

          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>{itemData?.temperature}&deg;</Text>
            <Icon color={iconColor} name={icons.temperatureIcon} size={20} />
          </View>

          <View style={styles.locationContainer}>
            <Icon color={iconColor} name={icons.locationIcon} size={20} />
            <Text style={styles.location}>{itemData?.location}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <Input
        inputStyle={styles.thought}
        inputContainerStyle={{borderBottomWidth: 0}}
        multiline={true}
        value={thoughts}
        numberOfLines={4}
        editable={false}
        placeholder="Type your thoughts..."
      />
    </View>
  );
};

export default DayView;

const styles = StyleSheet.create({
  ...stylesGlobalCards,
  cardImgWrapper: {
    flex: 1,
  },
  thought: {fontSize: 20, fontFamily: 'Inter-Regular'}
});
