const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Get request to find all countries in the database by name
module.exports = function(router) {
  let sql = "SELECT DISTINCT CountryName FROM info";
  router.get('/countryname', function(req, res) {
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
