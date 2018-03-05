const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
  'Content-Type': 'application/json',
};

module.exports = corsHeaders;
