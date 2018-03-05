/* eslint-disable no-console */
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
// const corsHeaders = require('./cors-headers.js');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
  'Content-Type': 'application/json',
};

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        // headers: { 'Content-Type': 'text/plain' },
        headers: corsHeaders,
        // body: 'Couldn\'t fetch the voter item.',
        body: JSON.stringify({ msg: 'Couldn\'t fetch the voter item.' }),
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
