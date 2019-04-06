/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import AuthNav from './AuthNav';

const Nav = props => (
  <nav className="nav">
    <Link className="nav-link" to="/">Home</Link>
    <br />
    <AuthNav {...props} />
  </nav>
);

export default Nav;
