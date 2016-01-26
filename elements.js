'use strict';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'meals'
});

connection.connect();


function allItems(callback) {
  connection.query('SELECT * FROM meals', function(err, result) {
    if (err) throw err;
    callback(result);
  });
}

module.exports = {
  all: allItems,
};
