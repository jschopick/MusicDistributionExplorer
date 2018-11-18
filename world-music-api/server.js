var express = require('express'),
  mysql = require('mysql'),
  app = express(),
  port = process.env.PORT || 8000;

var connection = mysql.createConnection({
// Properties
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'worldmusic'
});

// This did not work until executing this command:
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''

connection.connect(function(err) {
  if(err) {
    console.log('Error: could not connect to DB');
  } else {
    console.log('Connected to to DB!');
  }
});

let sql = "SELECT * FROM info WHERE Genre = 'Rock'";
let i = 0;


app.get('/', function(req, res) {
  // SQL queries
  connection.query(sql, function(err, rows) {
    if(err) {
      console.log('Error: could not execute query');
    } else {
      console.log('\nQuery was successful');
      let results = "Results: ";
      if(rows.length > 0) {
        // Get the country for each row returned.
        for(i = 0; i < rows.length - 1; i++) {
          console.log('Country: ' + rows[i].Country);
          results += rows[i].Country + ', ';
        }
        results += rows[i].Country;
        if (rows.length == 1) { // If only one result
          console.log('Country: ' + rows[0].Country);
          res.send(rows[0].Country);
        } else { // If multiple results
          console.log('Country: ' + rows[i].Country);
          res.send(results);
        }
      } else { // If no rows returned
        console.log("No results found");
        res.send("No results found");
      }
    }
  });
});

app.listen(port);
console.log(`Server is running on port: ${port}`);