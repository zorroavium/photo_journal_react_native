import { TouchableOpacity, View, StyleSheet, LogBox } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import 'react-native-gesture-handler';
import React from 'react';

import HomeScreen from '../screens/Home/Home';
import DayView from '../screens/DayView/DayView';
import InfoScreen from '../screens/Summary/InfoScreen';
import PhotoView from '../screens/PhotoView/PhotoView';
import CameraTab from '../screens/CameraTab/cameraTab';
import CameraView from '../screens/CameraView/cameraView';

import Screens from '../constants/screenConstants';
import CustomTitle from '../components/customTitle';
import ScreenOptionsIcon from '../components/screenOptionsIcon';
import CustomTabBarButton from '../components/customTabBarButton';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  addLine: {label : 'add-line', color: '#00e3ba'},
  backArraow: {label : 'arrow-left-s-line'},
}

const options = {
  tabBarInactiveTintColor: '#FFFFFF',
  tabBarActiveTintColor: '#2D3038',
  tabBarStyle: {
    height: '8%',
  },
  tabBarShowLabel: false,
};

LogBox.ignoreAllLogs(); //Ignore all log notifications

const ScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Splash}
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTitle: () => (
            <CustomTitle
              hasNavigationArrow={true}
              text1="pic"
              text2="a"
              text3="day"
            />
          ),
          headerStyle: {},
        }}>
        <Stack.Screen
          name={Screens.Home}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Screens.PhotoView}
          component={PhotoView}
          options={({navigation}) => ({
            headerLeft: () => (
              <Icon
                containerStyle={styles.backArrowContainerStyle}
                name={icons.backArraow.label}
                size={24}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name={Screens.DayView}
          component={DayView}
          options={({navigation}) => ({
            headerLeft: () => (
              <Icon
                containerStyle={styles.backArrowContainerStyle}
                name={icons.backArraow.label}
                size={24}
                onPress={() => {
                  navigation.navigate(Screens.Home);
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name={Screens.CameraView}
          component={CameraView}
          options={({navigation}) => ({
            headerLeft: () => (
              <Icon
                containerStyle={styles.backArrowContainerStyle}
                name={icons.backArraow.label}
                size={24}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.HomeScreen}
      screenOptions={({route}) => ({
        ...options,
        tabBarIcon: ({focused}) => (
          <ScreenOptionsIcon focused={focused} routeName={route.name} />
        ),
        headerTitleAlign: 'center',
        headerStyle: {height: 80},
      })}>
      <Tab.Screen
        name={Screens.HomeScreen}
        component={HomeScreen}
        options={{
          headerTitle: () => <CustomTitle text1="pic" text2="a" text3="day" />,
        }}
      />
      <Tab.Screen
        name={Screens.CameraTab}
        component={CameraTab}
        options={{
          tabBarIcon: () => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate(Screens.CameraView)}
                style={styles.roundButton}>
                <Icon name={icons.addLine.label} size={24} color={icons.addLine.color} />
              </TouchableOpacity>
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={Screens.Info}
        component={InfoScreen}
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
  backArrowContainerStyle: {
    position: 'relative',
    marginLeft: 15,
    marginRight: 0,
    left: 30,
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
