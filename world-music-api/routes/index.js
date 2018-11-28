var express = require('express'),
  fs = require('fs'),
  router = express.Router();

// function is called when file is `required`
module.exports = function(app) {
  // Use /api prefix for all routes
  app.use('/api', router);
  // Call every route file in this folder
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == 'index.js') return;
    
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(router);
  });
};
