/* eslint-disable no-console */
const https = require('https');
// const AWS = require('aws-sdk');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
  'Content-Type': 'application/json',
};

function fbGet(id, token) {
  const path = `/${id}?fields=id,name,birthday,hometown,location`;
  const root = 'https://graph.facebook.com/v2.12';
  const fullUrl = `${root}${path}&access_token=${token}`;

  return new Promise((resolve, reject) => {
    https.get(fullUrl, (resp) => {
      let data = '';
      resp.on('data', (chunk) => { data += chunk; });
      resp.on('end', () => {
        const json = JSON.parse(data);
        resolve(json);
      });
    }).on('error', err => reject(err));
  });
}

module.exports.votehandler = (event, context, callback) => {
  // console.info('event', event);
  const body = JSON.parse(event.body);

  fbGet(body.id, body.token)
    .then((fbjson) => {
      callback(null, {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ fbjson }),
      });
    })
    .catch((err) => {
      callback(null, {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ err }),
      });
    });

  // callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
