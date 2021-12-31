import { TouchableOpacity, View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import 'react-native-gesture-handler';
import React from 'react';

import Splash from '../global/splash';
import HomeScreen from '../screens/Home/Home';
import DayView from '../screens/DayView/DayView';
import Summary from '../screens/Summary/Summary';
import OpenCamera from '../components/openCamera';
import screens from '../constants/screenConstants';
import CustomTitle from '../components/customTitle';
import PhotoView from '../screens/PhotoView/PhotoView';
import ScreenOptionsIcon from '../components/screenOptionsIcon';
import CustomTabBarButton from '../components/customTabBarButton';

const Stack = createNativeStackNavigator();
const StackPhotoView = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const options = {
  tabBarInactiveTintColor: '#FFFFFF',
  tabBarActiveTintColor: '#2D3038',
  tabBarStyle: {
    height: '8%',
  },
  tabBarShowLabel: false,
};

const photoStack = () => {
  return (
    <StackPhotoView.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="PhotoViewNested"
        component={PhotoView}
      />
    </StackPhotoView.Navigator>
  );
};

const ScreenStack = ({route}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens.Splash}>
        <Stack.Screen
          name={screens.Splash}
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name={screens.Home}
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen name="photoStack" component={photoStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName={screens.HomeScreen}
      screenOptions={({route}) => ({
        ...options,
        tabBarIcon: ({color, focused}) => (
          <ScreenOptionsIcon focused={focused} routeName={route.name} />
        ),
        headerTitleAlign: 'center',
        headerStyle: {height: 80},
      })}>
      <Tab.Screen
        name={screens.HomeScreen}
        component={HomeScreen}
        options={{
          headerTitle: () => <CustomTitle text1="pic" text2="a" text3="day" />,
        }}
      />
      <Tab.Screen
        name="Day View"
        component={DayView}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View>
              <TouchableOpacity onPress={OpenCamera} style={styles.roundButton}>
                <Icon name="add-line" size={24} color="#00e3ba" />
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
