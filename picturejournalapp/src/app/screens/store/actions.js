import axios from 'axios';

import {BASE_URL_LOCATION, BASE_WEATHER_URL} from '../../config';

// Define action types
export const SAVE_COORDINATES = 'SAVE_COORDINATES';
export const SAVE_LOCATION_DETAILS = 'SAVE_LOCATION_DETAILS';
export const SAVE_TEMPERATURE = 'SAVE_TEMPERATURE';
export const SAVE_IMAGE_PATH = 'SAVE_IMAGE_PATH';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const UPDATE_THOUGHT = 'UPDATE_THOUGHT';

// [asynchronous action]
export const getLocationDetails = location => {
  try {
    return async dispatch => {
      const response = await axios.get(
        `${BASE_URL_LOCATION(location?.latitude, location?.longitude)}`,
      );
      console.log('getLocationDetails response received', response?.data);
      if (response.data) {
        dispatch({
          type: SAVE_LOCATION_DETAILS,
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
          type: SAVE_TEMPERATURE,
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
export const saveCoordinates = location => dispatch => {
  dispatch({
    type: SAVE_COORDINATES,
    payload: location,
  });
};

export const saveImagePath = path => dispatch => {
  dispatch({
    type: SAVE_IMAGE_PATH,
    payload: path,
  });
};

export const removeImage = key => dispatch => {
  dispatch({
    type: REMOVE_IMAGE,
    payload: key,
  });
};

export const updatethought = key => dispatch => {
  dispatch({
    type: UPDATE_THOUGHT,
    payload: key,
  });
};
