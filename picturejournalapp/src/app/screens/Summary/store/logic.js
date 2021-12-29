import axios from 'axios';
import {GET_WEATHER_INFO} from './actions';

import {BASE_URL} from '../../../config';

export const weatherInfoLogic = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
        console.log(response.data);
        dispatch({
          type: GET_WEATHER_INFO,
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

export default [weatherInfoLogic];
