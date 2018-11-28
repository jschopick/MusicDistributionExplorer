const connection = require('../connection');

// Get request to find all artists in the database
module.exports = function(router) {
  let sql = "SELECT DISTINCT Artist FROM info";
  router.get('/artists', function(req, res) {
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
