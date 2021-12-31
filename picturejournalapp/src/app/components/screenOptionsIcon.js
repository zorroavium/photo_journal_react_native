import React from 'react';
import Icon from 'react-native-remix-icon';

const iconsFocused = {
  HomeScreen: 'home-fill',
  Summary: 'information-fill'
}

const icons = {
  HomeScreen: 'home-line',
  Summary: 'information-line'
}

const getIconName = ({routeName, focused}) => {
  debugger;
  console.log('getIconName', focused, routeName);
  return focused ? iconsFocused[routeName] : icons[routeName];
};

const ScreenOptionsIcon = props => <Icon name={getIconName(props)} size={24} color='#6c6c6c' />;

export default ScreenOptionsIcon;
