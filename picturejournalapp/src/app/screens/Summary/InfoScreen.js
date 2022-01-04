import {StyleSheet, Text, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Divider } from 'react-native-elements';
import {useSelector} from 'react-redux';

export default function InfoScreen() {

  const resourceReducer = useSelector(state => state.resourceReducer);
  const [data, setData] = useState(null);
  const [hotest, setHotest] = useState(null);
  const [coldest, setColdest] = useState(null);
  const [totalDays, setTotalDays] = useState(null);

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  function dateDiffInDays(date1, date2) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const getFormattedDate = (dateString) => {
    console.log(dateString);
    const dateArray = new Date(dateString).toString().split(' ');
    console.log(dateArray);
    const date = `${dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2] + ', ' + dateArray[3]}`; 
    return date;
  }

  const getRecordedDays = () => {
    return Object.keys(data).length;
  }

  useEffect(() => {
    const dataMap = resourceReducer.dataMap; 
    let hotestDay = dataMap[Object.keys(dataMap)[0]];
    let coldestDay = dataMap[Object.keys(dataMap)[0]];

    Object.entries(resourceReducer.dataMap).forEach(([key, value], index) => {
      console.log('*****InfoScreen*********',key , value, index);
      if(hotestDay.temperature < value.temperature) {
        hotestDay = {...value};
      }
      if(coldestDay.temperature > value.temperature) {
        coldestDay = {...value};
      }

      setHotest(hotestDay);
      setColdest(coldestDay);
      setData(dataMap);
      setTotalDays(dateDiffInDays(new Date(resourceReducer?.firstEntry?.date), new Date(resourceReducer?.lastEntry?.date)));
    });

    console.log(hotest, coldest);
  }, [resourceReducer]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.header}>Days</Text>
        <Text style={styles.value}>{getRecordedDays()}/{totalDays}</Text>
        <Text style={styles.info}>
          You have recorded {getRecordedDays()} days since the first day
        </Text>
      </View>

      <Divider style={styles.divider} width={2} />

      <View style={styles.subContainer}>
        <Text style={styles.header}>Hottest Day</Text>
        <Text style={styles.value}>{hotest?.temperature}&deg;</Text>
        <Text style={styles.info}>{getFormattedDate(hotest?.date)}</Text>
      </View>

      <Divider style={styles.divider} width={2} />

      <View style={styles.subContainer}>
        <Text style={styles.header}>Coldest Day</Text>
        <Text style={styles.value}>{coldest?.temperature}&deg;</Text>
        <Text style={styles.info}>{getFormattedDate(coldest?.date)}</Text>
      </View>

      <Divider style={styles.divider} width={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    alignItems: 'center',
    maxHeight: 140,
    backgroundColor: '#f8f8f8',
    paddingTop: 20
  },
  divider: {
    backgroundColor: '#f8f8f8',
    width: '90%',
    opacity: 0.2
  },
  header: {
    color: '#6c6c6c',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    color: '#314743',
    fontSize: 60,
    fontFamily: 'Inter-ExtraBold',
  },
  info: {
    color: '#868686',
    fontSize: 16,
  }
});
