const connection = require('../connection');

// Get request for everything with Metal Genre
// Note: Empty Set
module.exports = function(router) {
  let sql = "SELECT * from topgenres WHERE TopGenre = 'Metal'";
  router.get('/metal', function(req, res) {
    connection.query(sql, function(err, rows) {
      if(err) {
        console.log('Error: could not execute query');
      } else {
        console.log('\nSuccessful Query');
        console.log(rows);
        res.json(rows);
      }
    });
  });
};