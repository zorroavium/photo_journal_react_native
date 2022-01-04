import React from 'react';
import Icon from 'react-native-remix-icon';

const iconsFocused = {
  HomeScreen: 'home-fill',
  InfoScreen: 'information-fill'
}

const icons = {
  HomeScreen: 'home-line',
  InfoScreen: 'information-line'
}

const getIconName = ({routeName, focused}) => {
  return focused ? iconsFocused[routeName] : icons[routeName];
};

const ScreenOptionsIcon = props => <Icon name={getIconName(props)} size={24} color='#6c6c6c' />;

export default ScreenOptionsIcon;
