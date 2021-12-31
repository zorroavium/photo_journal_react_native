import React from 'react';
import {Icon} from 'react-native-elements';

const icons = {
  HomeScreen: 'home',
  Summary: 'info'
}

const ScreenOptionsIcon = props => <Icon name={icons[props.routeName]} type="feather" size={24} color={props.color} />;

export default ScreenOptionsIcon;
