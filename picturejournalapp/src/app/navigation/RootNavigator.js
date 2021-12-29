import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

// Import screens
import Home from '../screens/Home/Home';
import DayView from '../screens/DayView/DayView';
import Summary from '../screens/Summary/Summary';
import PhotoView from '../screens/PhotoView/PhotoView';

// Import mock screens
import BooksList from '../screens/BooksList';
import BookmarksList from '../screens/BookmarksList';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../global/splash';
import CustomTitle from '../components/customTitle';
var ImagePicker = require('react-native-image-picker');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const screens = {
  Splash: 'Splash',
  Home: 'HomeTabNavigator',
  BooksList: 'BooksList',
  Summary: 'Summary',
};

const options = {
  tabBarInactiveTintColor: '#FFFFFF',
  tabBarActiveTintColor: '#2D3038',
  tabBarStyle: {
    height: '8%',
    backgroundColor: 'lightgray',
  },
  tabBarShowLabel: false,
};

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

const screenOptionsIcon = (route, color) => {
  let iconName;

  switch (route.name) {
    case screens.BooksList:
      iconName = 'home';
      break;
    case screens.Summary:
      iconName = 'info';
      break;
    default:
      break;
  }

  return <Icon name={iconName} type="feather" size={24} color={color} />;
};

const openCamera = async () => {
  const grantedcamera = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'App Camera Permission',
      message: 'App needs access to your camera ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  const grantedstorage = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'App Camera Permission',
      message: 'App needs access to your camera ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  if (
    grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
    grantedstorage === PermissionsAndroid.RESULTS.GRANTED
  ) {
    console.log('Camera & storage permission given');

    const {height, width} = Dimensions.get('window');
    const options = {
      quality: 0.9,
      mediaType: 'photo',
      saveToPhotos: true, //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
      includeBase64: false,
    };
    const result = await ImagePicker.launchCamera(options);
    console.log('openCamera!!', ImagePicker, result);
  } else {
    console.log('Camera permission denied');
  }
};

const ScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens.Splash}>
        <Stack.Screen
          name={screens.Splash}
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={screens.Home}
          component={HomeTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={screens.BooksList}
      screenOptions={({route}) => ({
        ...options,
        tabBarIcon: ({color}) => screenOptionsIcon(route, color),
        headerTitleAlign: 'center',
        headerStyle: {height: 80},
      })}>
      <Tab.Screen
        name={screens.BooksList}
        component={BooksList}
        options={{
          headerTitle: () => <CustomTitle text1="pic" text2="a" text3="day" />,
        }}
      />
      <Tab.Screen
        name="PhotoView"
        component={PhotoView}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View>
              <TouchableOpacity onPress={openCamera} style={styles.roundButton}>
                <Icon name="plus" type="feather" size={24} color="#00e3ba" />
              </TouchableOpacity>
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={screens.Summary}
        component={Summary}
        options={{
          headerTitle: () => <CustomTitle text1="pic" text2="a" text3="day" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default ScreenStack;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: 'white',
  },
  titleText1: {
    fontSize: 30,
    color: '#6c6c6c',
    fontFamily: 'Inter-Bold',
  },
  titleText2: {
    fontSize: 30,
    color: '#6c6c6c',
    fontFamily: 'Inter-Regular',
  },
  titleText3: {
    fontSize: 30,
    color: '#00e3ba',
    fontFamily: 'Inter-SemiBold',
  },
  label: {
    marginTop: 20,
    fontSize: 24,
  },
});
