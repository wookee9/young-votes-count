/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthNav = ({
  isAuthenticated,
  signout,
}) => {
  const handleLogout = (e) => {
    e.preventDefault();
    signout(() => null);
  };

  if (isAuthenticated) {
    return (
      <React.Fragment>
        <Link to="/profile" className="nav-link">User</Link>
        <a
          href="#"
          className="nav-link"
          onClick={handleLogout}
        >
          Logout
        </a>
      </React.Fragment>
    );
  }

  return (
    <Link className="nav-link" to="/login">
      Login
    </Link>
  );
};

AuthNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
};

export default AuthNav;
