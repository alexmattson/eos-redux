import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// import containers here

// import actions here

const Root = ({ store }) => {
	return (
		<Provider store={store}>
			<Router history={hashHistory}>
        // Routes go here
			</Router>
		</Provider>
	);
};
