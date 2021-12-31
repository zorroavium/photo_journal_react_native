import axios from 'axios';

import {BASE_URL, BASE_URL_LOCATION, BASE_WEATHER_URL} from '../../config';

// Define action types
export const SAVE_LOCATION = 'SAVE_LOCATION';
export const GET_LOCATION_DETAILS = 'GET_LOCATION_DETAILS';
export const GET_TEMPERATURE = 'GET_TEMPERATURE';

// [asynchronous action]
export const getLocationDetails = location => {
  try {
    return async dispatch => {
      const response = await axios.get(
        `${BASE_URL_LOCATION(location?.latitude, location?.longitude)}`,
      );
      console.log('getLocationDetails', response?.data);
      if (response.data) {
        dispatch({
          type: GET_LOCATION_DETAILS,
          payload: response.data,
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

// [asynchronous action]
export const getTemperature = location => {
  try {
    return async dispatch => {
      const response = await axios.get(
        `${BASE_WEATHER_URL(location?.latitude, location?.longitude)}`,
      );
      console.log('getTemperature', response?.data);
      if (response.data) {
        dispatch({
          type: GET_TEMPERATURE,
          payload: response.data,
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

// [synchronous action]
export const saveLocation = location => dispatch => {
  dispatch({
    type: SAVE_LOCATION,
    payload: location,
  });
};
