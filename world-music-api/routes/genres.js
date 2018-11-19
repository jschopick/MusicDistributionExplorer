const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Get request to find all genres in the database
module.exports = function() {
  let sql = "SELECT DISTINCT Genre FROM info";
  router.get('/genres', function(req, res) {
    connection.query(sql, function(err, rows) {
      if(err) {
        console.log('Error: could not execute query');
      } else {
        console.log('\nSuccessful Query');
        res.json(rows);
      }
    });
  });
};
