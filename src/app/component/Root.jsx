/* eslint-disable react/no-multi-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../view/Home';
import Profile from '../view/Profile';
import Login from '../view/Login';
import Nav from './Nav';

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signout = (cb) => {
    setIsAuthenticated(false);
    cb();
  };

  const signin = (cb) => {
    setIsAuthenticated(true);
    cb();
  };

  return (
    <Router>
      <Nav
        signout={signout}
        isAuthenticated={isAuthenticated}
      />
      <div className="container-fluid">
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          render={props => (
            <Login
              {...props}
              isAuthenticated={isAuthenticated}
              signin={signin}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/profile"
          isAuthenticated={isAuthenticated}
          component={Profile}
        />
      </div>
    </Router>
  );
}

export default Root;
