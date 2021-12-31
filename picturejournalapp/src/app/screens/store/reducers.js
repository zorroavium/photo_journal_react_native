import {
  GET_LOCATION,
  SAVE_LOCATION,
  GET_TEMPERATURE,
} from './actions';

const initialState = {
  location: [],
  locationDetails: [],
  temperature: [],
};

function resourceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      console.log(action.payload);
      return {...state, location: action.payload};
    case GET_TEMPERATURE:
      console.log('GET_TEMPERATURE', action.payload);
      return {...state, temperature: action.payload};
    case SAVE_LOCATION:
      console.log('SAVE_LOCATION', action.payload);
      return {...state, location: action.payload};
    default:
      return state;
  }
}

export default resourceReducer;
