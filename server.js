'use strict';

var elements = require('./elements.js');
var express = require('express');

var app = express();

app.use(express.static("public"));


app.get("/meals", function (req, res) {
  elements.all(function(result){
    res.json(result);
  });
});


app.listen(3000, function() {
  console.log('I am listening on port 3000...')
});
