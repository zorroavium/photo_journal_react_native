import {combineReducers} from 'redux';
import weatherReducer from '../screens/Summary/store/reducers';

export default combineReducers({
  weatherReducer: weatherReducer,
});
