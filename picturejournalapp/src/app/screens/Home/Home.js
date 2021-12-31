import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import Icon from 'react-native-remix-icon';
import React from 'react';

const data = [
  {
    id: '1',
    date: '2016-01-18 10:34:23',
    location: 'Pune, India',
    temperature: '15',
    image: require('../../assets/banners/food-banner1.jpg'),
  },
  {
    id: '2',
    date: '2016-01-17 10:34:23',
    location: 'Ranchi, India',
    temperature: '16',
    image: require('../../assets/banners/food-banner2.jpg'),
  },
  {
    id: '3',
    date: '2016-01-04 10:34:23',
    location: 'Bhubaneshwar, India',
    temperature: '17',
    image: require('../../assets/banners/food-banner3.jpg'),
  },
  {
    id: '4',
    date: '2016-01-04 10:34:23',
    location: 'Delhi, India',
    temperature: '18',
    image: require('../../assets/banners/food-banner4.jpg'),
  },
];

const icons = {
  temperatureIcon: 'sun-line',
  locationIcon: 'map-pin-3-line'
}

const getDayName = day => new Date(day).toString().split(' ')[1];
const getDate = day => new Date(day).toString().split(' ')[2];

const Home = ({navigation, route}) => {

  return (
    <View style={styles.cardsWrapper}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate('photoStack', {
              screen: 'PhotoView',
              params: { itemData: item },
            })}>

            <ImageBackground source={item.image} resizeMode="cover" style={styles.image}>
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
                <Icon color="#fff" name={icons.temperatureIcon} size={20} />
              </View>

              <View
                style={styles.locationContainer}>
                <Icon color="#fff" name={icons.locationIcon} size={20} />
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
  cardImgWrapper: {
    flex: 1,
  },
  image: {
    height: 180,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  dayName: {
    color: 'white',
    paddingLeft: 12,
    paddingBottom: 0,
    paddingTop: 10,
    fontSize: 20,
  },
  date: {
    color: 'white',
    paddingLeft: 10,
    lineHeight: 35,
    paddingTop: 0,
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    alignItems: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  temperature: {
    color: 'white',
    lineHeight: 35,
    paddingTop: 0,
    paddingRight: 3,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    opacity: 0.8,
  }
});
