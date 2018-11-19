// Connect to the database
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'worldmusic'
});

module.exports = connection;