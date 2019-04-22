import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({
  signin,
  location,
  isAuthenticated,
  username,
}) => {
  const [signInResultState, setSignInResultState] = useState(undefined);
  const [inputUserNameState, setInputUserNameState] = useState('');

  const { from } = location.state || { from: { pathname: '/' } };
  const showProtectedMessage = from.pathname === '/profile';

  const handleLogin = (providedUsername) => {
    signin(providedUsername, (signInResult) => {
      setSignInResultState(signInResult);
    });
  };

  const handleInputChange = e => setInputUserNameState(e.target.value);

  const setMessage = () => {
    if (signInResultState === false) {
      return 'Login failed. Please try again.';
    }

    if (isAuthenticated) {
      return `Logged in as ${username}`;
    }

    if (showProtectedMessage) {
      return `You must log in to view the page at ${from.pathname}`;
    }

    return 'Please login.';
  };

  return (
    <div>
      <p>{setMessage()}</p>
      {
        !isAuthenticated &&
        <React.Fragment>
          <div className="form-group">
            <input
              value={inputUserNameState}
              type="text"
              name="username"
              className="form-control"
              placeholder="User name"
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleLogin(inputUserNameState)}
          >
            Login
          </button>
        </React.Fragment>
      }
    </div>
  );
};

Login.defaultProps = {
  username: undefined,
};

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
};

export default Login;
