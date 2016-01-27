'use strict';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'meals'
});

connection.connect();


function allElements(callback) {
  connection.query('SELECT * FROM meals', function(err, result) {
    if (err) throw err;
    callback(result);
  });
}


function addElement(mealProperties, callback) {
  connection.query('INSERT INTO meals SET ?', mealProperties, function(err, result) {
    if (err) throw err;
    callback(result);
  })
}

function removeElement(id, callback) {
  connection.query('DELETE FROM meals WHERE id = ?', id, function(err, result) {
    if (err) throw err;
    callback(result);
  });
}


module.exports = {
  all: allElements,
  add: addElement,
  remove: removeElement,
  select: selectElements
};
