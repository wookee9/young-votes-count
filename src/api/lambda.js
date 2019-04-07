module.exports.auth = async event => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Foo User',
    input: event,
  }),
});
