const connection = require('../connection');

// Get request for everything with Alternative Genre
module.exports = function(router) {
  let sql = "SELECT * FROM info WHERE Genre = 'Alternative'";
  router.get('/alternative', function(req, res) {
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
