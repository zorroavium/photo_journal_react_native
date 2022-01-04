import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import React, { useState, useEffect} from 'react';
import Icon from 'react-native-remix-icon';
import {useSelector} from 'react-redux';

import Geolocation from '../../utils/geolocation';
import Screens from '../../constants/screenConstants';
import {stylesGlobalCards} from '../../global/style';

const icons = {
  temperatureIcon: 'sun-line',
  locationIcon: 'map-pin-3-line'
}

const iconColor = '#fff';

const getDayName = day => new Date(day).toString().split(' ')[1];
const getDate = day => new Date(day).toString().split(' ')[2];

const Home = ({navigation}) => {

  const resourceReducer = useSelector(state => state.resourceReducer);
  const [itemCollection, setItemCollection] = useState(null);

  useEffect(() => {
    setItemCollection(Object.values(resourceReducer.dataMap));
    console.log('Object.values(resourceReducer.dataMap)', itemCollection);
  }, [resourceReducer]);

  return (
    <View style={styles.cardsWrapper}>
      
      <Geolocation enable={true} />
      <FlatList
        data={itemCollection}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate(Screens.DayView, { itemData: item })}>

            <ImageBackground source={{uri: `file://${item.image}`}} resizeMode="cover" style={styles.image}>
              <View>
                <Text style={styles.dayName}>
                  {getDayName(item.date)}
                </Text>
                <Text style={styles.date}>
                  {getDate(item.date)}
                </Text>
              </View>

              <View
                style={styles.tempContainer}>
                <Text
                  style={styles.temperature}>
                  {item.temperature}&deg;
                </Text>
                <Icon color={iconColor} name={icons.temperatureIcon} size={20} />
              </View>

              <View
                style={styles.locationContainer}>
                <Icon color={iconColor} name={icons.locationIcon} size={20} />
                <Text style={styles.text}>{item.location}</Text>
              </View>
            </ImageBackground>

          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  ...stylesGlobalCards,
  cardImgWrapper: {
    flex: 1,
  }
});
