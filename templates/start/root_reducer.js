import { combineReducers } from 'redux';
import CarsReducer from './cars_reducer';

const RootReducer = combineReducers({
	cars: CarsReducer
});

export default RootReducer;
