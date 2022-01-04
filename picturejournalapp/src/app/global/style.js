import {StyleSheet} from 'react-native';

export const stylesGlobalCards = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 5,
  },
  dayName: {
    color: 'white',
    paddingLeft: 12,
    paddingBottom: 0,
    paddingTop: 10,
    fontSize: 20,
  },
  date: {
    color: 'white',
    paddingLeft: 10,
    lineHeight: 35,
    paddingTop: 0,
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    alignItems: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  temperature: {
    color: 'white',
    lineHeight: 35,
    paddingTop: 0,
    paddingRight: 3,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    opacity: 0.8,
  },
  location: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 5,
  },
  image: {
    height: 180,
  }
});
