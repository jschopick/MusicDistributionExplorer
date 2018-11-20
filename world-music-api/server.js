var express = require('express'),
  connection = require('./connection'),
  app = express(),
  port = process.env.PORT || 8000;

// Add headers for http requests
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,origin,content-type,accept'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

// Connect to MySQL Database
connection.connect(function(err) {
  if(err) {
    console.log('Error: could not connect to MySQL Database');
  } else {
    console.log('Connected to MySQL Database');
  }
});

// Instantiate all routes
require('./routes/index')(app);

app.listen(port);
console.log(`Server is running on port: ${port}`);