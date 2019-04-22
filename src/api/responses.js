exports.errorResponse = {
  statusCode: 400,
  body: JSON.stringify({ message: 'Bad request - No username' }),
};

exports.unauthedResponse = {
  statusCode: 403,
  body: JSON.stringify({ message: 'Unauthorised' }),
};

exports.verifiedResponse = {
  statusCode: 200,
  body: JSON.stringify({ verified: true }),
};

exports.authedResponse = token => ({
  statusCode: 200,
  body: JSON.stringify({ token }),
});
