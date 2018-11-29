const connection = require('../connection');

// Get request for everything in Top Genres database
module.exports = function(router) {
  let sql = "SELECT * FROM topgenres";
  router.get('/topgenres', function(req, res) {
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
