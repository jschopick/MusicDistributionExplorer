const express = require('express');
const router = express.Router();
const connection = require('../../models/connection');

// Get request for information based on a genre.
module.exports = function(router) {
  let sql = "SELECT DISTINCT Genre FROM info";
  // let sql = "SELECT * FROM info WHERE Genre = 'Rock'";
  router.get('/genres', function(req, res) {
    connection.query(sql, function(err, rows) {
      if(err) {
        console.log('Error: could not execute query');
      } else {
        console.log('\nSuccessful Query');
        // Get the country for each row returned.
        console.log(rows);
        res.json(rows);
      }
    });
  });
};
