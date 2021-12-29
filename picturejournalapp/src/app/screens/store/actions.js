import axios from 'axios';

import {BASE_URL, BASE_URL_LOCATION} from '../../config';

// Define action types
export const GET_BOOKS = 'GET_BOOKS';
export const GET_LOCATION = 'GET_Location';
export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';

// [asynchronous action]
export const getBooks = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
        dispatch({
          type: GET_BOOKS,
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
export const getLocation = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL_LOCATION('1', '2')}`);
      if (response.data) {
        dispatch({
          type: GET_LOCATION,
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
export const addBookmark = book => dispatch => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: book,
  });
};

export const removeBookmark = book => dispatch => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: book,
  });
};
