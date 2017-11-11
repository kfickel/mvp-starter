var express = require('express');
var bodyParser = require('body-parser');
var foodFork = require('../foodFork/foodFork.js');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.post('/recipes', function(req, res) {
  var recipe = '';
  req.on('data', (chunk) => {
    recipe += chunk;
  })
  req.on('end', () => {
    foodFork(recipe, function() {
      res.end('complete');
    })
    // console.log('REQ data ', data);
  })
});

app.get('/items', function (req, res) {
  // console.log('here');

  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

