/* eslint no-console: ["error", { allow: ["error","info"] }] */

const { retrieveAuthCookie, verifyJwt, signJwt } = require('./actions');
const {
  authedResponse,
  unauthedResponse,
  verifiedResponse,
  errorResponse,
} = require('./responses');

const userCookieKey = 'yvc-user';

module.exports.auth = async (event) => {
  const secret = process.env.YVC_JWT_SECRET_KEY;
  const acceptedUsername = process.env.ACCEPTED_USERNAME;
  const { username } = JSON.parse(event.body);

  if (!username) return errorResponse;

  if (username !== acceptedUsername) {
    return unauthedResponse;
  }

  const token = signJwt(username, secret);

  return authedResponse(token);
};

module.exports.verify = async (event) => {
  const secret = process.env.YVC_JWT_SECRET_KEY;
  // serverless-offline seems to provide a lowercase 'cookie' header. Lambda capitalises it.
  const cookies = event.headers.Cookie || event.headers.cookie;
  const userToken = retrieveAuthCookie(cookies, userCookieKey);

  try {
    verifyJwt(userToken, secret);
    return verifiedResponse;
  } catch (err) {
    console.error(err);
    return unauthedResponse;
  }
};

module.exports.test = async () => {
  const test = process.env.TEST;

  return {
    statusCode: 200,
    body: JSON.stringify({ test }),
  };
};
