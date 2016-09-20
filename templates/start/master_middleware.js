import { applyMiddleware } from 'redux';
import CarsMiddleware from './cars_middleware';

const masterMiddleware = applyMiddleware(
	CarsMiddleware
);

export default masterMiddleware;
