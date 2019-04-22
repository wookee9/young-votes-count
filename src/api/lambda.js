const { retrieveAuthCookie, verifyJwt, signJwt } = require('./actions');
const {
  authedResponse,
  unauthedResponse,
  verifiedResponse,
  errorResponse,
} = require('./responses');

const secret = process.env.YVC_JWT_SECRET_KEY;
const acceptedUsername = process.env.ACCEPTED_USERNAME;
const userCookieKey = 'yvc-user';

module.exports.auth = async (event) => {
  const { username } = JSON.parse(event.body);

  if (!username) return errorResponse;

  if (username !== acceptedUsername) {
    return unauthedResponse;
  }

  const token = signJwt(username, secret);

  return authedResponse(token);
};

module.exports.verify = async (event) => {
  const userToken = retrieveAuthCookie(event.headers.cookie, userCookieKey);

  try {
    verifyJwt(userToken, secret);
    return verifiedResponse;
  } catch (err) {
    return unauthedResponse;
  }
};
