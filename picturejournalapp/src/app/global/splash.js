import React from 'react';
import CustomTitle from '../components/customTitle';
import {View, Text, StyleSheet} from 'react-native';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.navigate();
    }, 250);
  }

  navigate = async () => {
    try {
      this.props.navigation.replace('HomeTabNavigator');
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return <CustomTitle text1="pic" text2="a" text3="day" />;
  }
}

export default Splash;
