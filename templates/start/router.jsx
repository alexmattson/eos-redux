import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// import components here
import App from './app';


class AppRouter extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
  	return (
  		<Router history={hashHistory}>
        <Route path="/" component={ App }>
          // Routes go here
        </Route>
  		</Router>
  	);
  }
}

export default AppRouter;
