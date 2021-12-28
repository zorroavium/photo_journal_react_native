import {Component} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class GeoLocation extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  async componentDidMount() {
    if (this.props.enable) {
      if (Platform.OS === 'ios') {
        this.getlocation();
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
            this.getlocation();
          } else {
            console.log('location: permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
  }

  getlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('location: the position is ', position);
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => console.log('location: the error is ', error, error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    this.watchID = Geolocation.watchPosition(
      position => console.log('location: updated position is ', position),
      error => console.log('location: the error is ', error, error.message),
      {
        enableHighAccuracy: true,
        distanceFilter: 500,
        useSignificantChanges: true,
      },
    );
  };

  componentWillUnmount = () => {
    if (this.props.enable) {
      Geolocation.clearWatch(this.watchID);
    }
  };

  render() {
    return null;
  }
}
export default GeoLocation;
