import {GET_WEATHER_INFO} from './actions';

const initialState = {
  weatherInfo: [],
};

function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER_INFO:
      return {...state, weatherInfo: action.payload};
    default:
      return state;
  }
}

export default weatherReducer;
