const connection = require('../connection');

// Get request for everything in the database
module.exports = function(router) {
  let sql = "SELECT * FROM info";
  router.get('', function(req, res) {
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
