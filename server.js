'use strict';



var elements = require('./elements.js');
var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());


app.get('/meals', function (req, res) {
  elements.all('meals', function(result){
    res.json(result);
  });
});

app.get('/calorie', function(req, res) {
  elements.all('calorie', function(result) {
    res.json(result);
  });
});


app.post('/meals', function(req, res) {
  console.log(req.body);
  elements.add(req.body, function(result) {
    res.json(result);
    console.log(result);
  });
});

app.delete("/meals/:id", function (req, res) {
  elements.remove(req.params.id, function(result) {
    res.json(result);
  });
});

app.listen(3000, function() {
  console.log('I am listening on port 3000...')
});
