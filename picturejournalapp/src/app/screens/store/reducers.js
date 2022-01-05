import {
  GET_LOCATION,
  SAVE_COORDINATES,
  SAVE_TEMPERATURE,
  SAVE_LOCATION_DETAILS,
  SAVE_IMAGE_PATH,
  REMOVE_IMAGE,
  UPDATE_THOUGHT,
} from './actions';

import { IMAGE_ENTRY_KEY } from '../../config/index'

const initialState = {
  location: [],
  locationDetails: [],
  temperature: [],
  userInfoHistory: [],
  imageUriMap: {},
  dataMap: {},
  firstEntry: {},
  lastEntry: {},
};

function resourceReducer(state = initialState, action) {
  switch (action.type) {

    case SAVE_IMAGE_PATH:
      console.log('SAVE_IMAGE_PATH', action.payload, state);
      
      let data = {
        date: new Date(),
        location:
          state?.locationDetails?.address?.city +
          ', ' +
          state?.locationDetails?.address?.country,
       temperature: Math.round(state?.temperature?.current?.temp),
       image: action.payload,
       thoughts: state.thoughts
      }
      state.dataMap[IMAGE_ENTRY_KEY] = {...data};
      let firstEntry = state.firstEntry;
      if(Object.keys(state.dataMap).length === 1) {
        firstEntry = {...data};
      }
      return {...state, imageUriMap: {...state.imageUriMap}, dataMap: {...state.dataMap}, firstEntry: {...firstEntry}, lastEntry: {...data}};

    case UPDATE_THOUGHT:
      console.log('UPDATE_THOUGHT', action.payload);
      state.dataMap[IMAGE_ENTRY_KEY].thoughts = action.payload;
      return {...state, thoughts: action.payload, dataMap: {...state.dataMap}};

    case REMOVE_IMAGE:
      console.log('REMOVE_IMAGE', action.payload);
      delete state.dataMap[action.payload];
      state.thoughts = null;
      return {...state, dataMap: {...state.dataMap}};

    case GET_LOCATION:
      console.log(action.payload);
      return {...state, location: action.payload};

    case SAVE_TEMPERATURE:
      console.log('SAVE_TEMPERATURE', action.payload);
      return {...state, temperature: action.payload};

    case SAVE_COORDINATES:
      console.log('SAVE_LOCATION', action.payload);
      return {...state, location: action.payload};

    case SAVE_LOCATION_DETAILS:
      console.log('SAVE_LOCATION_DETAILS reducer', action.payload);
      let userInfoHistory = [
        ...state.userInfoHistory,
        {
          location: state.location,
          locationDetails: action.payload,
          temperature: state.temperature,
          date: new Date(),
        },
      ];
      return {...state, locationDetails: action.payload, userInfoHistory: userInfoHistory};
      
    default:
      return state;
  }
}

export default resourceReducer;
