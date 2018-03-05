/* eslint-disable no-console */
// const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
// const corsHeaders = require('./cors-headers');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
  'Content-Type': 'application/json',
};

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.id !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ msg: 'Couldn\'t create the voter item.' }),
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      // id: uuid.v1(),
      id: data.id,
      name: data.name,
      birthday: data.birthday,
      votes: {},
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the voter to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        // headers: { 'Content-Type': 'text/plain' },
        headers: corsHeaders,
        body: JSON.stringify({ msg: 'Couldn\'t create the voter item.' }),
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
