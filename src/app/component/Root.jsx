/* global fetch */
/* eslint no-console: ["error", { allow: ["info"] }] */
/* eslint-disable react/no-multi-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import PrivateRoute from './PrivateRoute';
import Home from '../view/Home';
import Profile from '../view/Profile';
import Login from '../view/Login';
import Nav from './Nav';

const cookiesClient = new Cookies();
const userCookieKey = 'yvc-user';
const cookieMaxAge = 31536000;

const Root = () => {
  const [jwt, setJwt] = useState(false);

  const isAuthenticated = !!jwt;
  const { username } = jwt || { username: undefined };

  const signout = (cb) => {
    setJwt(false);
    cb();
  };

  const signin = async (providedUsername, cb) => {
    try {
      const response = await fetch(
        '/api/auth',
        {
          method: 'post',
          body: JSON.stringify({ username: providedUsername }),
        },
      );
      const { token } = await response.json();
      const decoded = jwtDecode(token);
      setJwt({
        token,
        username: decoded.id,
        decoded,
      });
      cookiesClient.set(
        userCookieKey,
        token,
        { path: '/', maxAge: cookieMaxAge },
      );
      cb(true);
    } catch (e) {
      setJwt(false);
      cb(false);
      console.info('Auth failed', e);
    }
  };

  const verify = async (cb) => {
    try {
      const response = await fetch('/api/verify');
      const { verified } = await response.json();
      cb(verified);
    } catch (e) {
      setJwt(undefined);
      console.info('Verification failed', e);
    }
  };

  return (
    <Router>
      <Nav
        signout={signout}
        isAuthenticated={isAuthenticated}
        username={username}
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
              username={username}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/profile"
          isAuthenticated={isAuthenticated}
          component={() => (
            <Profile
              username={username}
              verify={verify}
            />
          )}
        />
      </div>
    </Router>
  );
};

export default Root;
