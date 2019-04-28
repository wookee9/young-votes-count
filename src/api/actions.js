const jwt = require('jsonwebtoken');
const Cookies = require('universal-cookie');

exports.retrieveAuthCookie = (cookies, userCookieKey) => {
  const cookieClient = new Cookies(cookies);
  const userToken = cookieClient.get(userCookieKey);

  return userToken;
};

exports.signJwt = (username, secret) => jwt.sign(
  { id: username },
  secret,
  { expiresIn: '1y' },
);

exports.verifyJwt = (userToken, secret) => jwt.verify(userToken, secret);
