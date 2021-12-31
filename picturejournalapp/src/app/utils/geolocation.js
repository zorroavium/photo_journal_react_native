import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {
  saveLocation,
  getLocationDetails,
  getTemperature,
} from '../screens/store/actions';

const GeoLocation = props => {
  const [initialPosition, setInitialPosition] = useState('');
  const [lastPosition, setLastPosition] = useState('');
  const [watchID, setWatchID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (watchID) {
      Geolocation.clearWatch(watchID);
    }
    getLocationFromUserDevice();
  }, []);

  const saveUserLocation = location => dispatch(saveLocation(location));
  const getLocationDetailsUsingCoordinates = location => dispatch(getLocationDetails(location));
  const getTemperatureInfo = location => dispatch(getTemperature(location));

  const getLocationFromUserDevice = async () => {
    if (props.enable) {
      if (Platform.OS === 'ios') {
        getlocation();
      }
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (
            granted === PermissionsAndroid.RESULTS.GRANTED ||
            granted === true
          ) {
            getlocation();
          } else {
            console.log('location: permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
  };

  const getlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('location: the position is ', position);
        setInitialPosition({position});
        saveUserLocation(position.coords);
        getLocationDetailsUsingCoordinates(position.coords);
        getTemperatureInfo(position.coords);
      },
      error => console.log('location: the error is ', error, error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    setWatchID(
      Geolocation.watchPosition(
        position => console.log('location: updated position is ', position),
        error => console.log('location: the error is ', error, error.message),
        {
          enableHighAccuracy: true,
          distanceFilter: 500,
          useSignificantChanges: true,
        },
      ),
    );
  };

  return null;
};
export default GeoLocation;
