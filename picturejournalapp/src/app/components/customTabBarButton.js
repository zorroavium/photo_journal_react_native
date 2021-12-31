import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        width: 70,
        height: 70,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

export default CustomTabBarButton;
