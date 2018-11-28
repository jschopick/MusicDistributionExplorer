const connection = require('../connection');

// Get request to find all countries in the database by code
module.exports = function(router) {
  let sql = "SELECT DISTINCT CountryCode FROM info";
  router.get('/countrycode', function(req, res) {
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