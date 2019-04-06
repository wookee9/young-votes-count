import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ signin, location, isAuthenticated }) => {
  const handleLogin = () => {
    signin(() => null);
  };

  const { from } = location.state || { from: { pathname: '/' } };
  const showProtectedMessage = from.pathname === '/profile';

  if (isAuthenticated) {
    return <p>Logged in as User</p>;
  }

  return (
    <div>
      {
        showProtectedMessage &&
        <p>You must log in to view the page at {from.pathname}</p>
      }
      <button
        className="btn btn-primary"
        onClick={handleLogin}
      >
        Login with Facebook
      </button>
    </div>
  );
};

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
