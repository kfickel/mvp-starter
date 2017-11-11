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
  })
});

app.get('/recipes', function (req, res) {
  items.select(
  // .then(function(recipes) {
  //   res.json(recipes);
  // });
  function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/first', function(req, res) {
  items.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
});

app.post('/save', function(req, res) {
  var save = '';
  req.on('data', (chunk) => {
    save += chunk;
  })
  req.on('end', () => {
    for (var i = 0; i < save.length; i ++) {
      // console.log('slice ', save.slice(i, i+3));
      if (save.slice(i, i+3) === '...') {
        var title = save.slice(0,i);
        // console.log('title ', title);
        var query = save.slice(i+3);
        items.userRecipes(title, query, function() {
          res.send('')
        })
        // console.log('query ', query);
      }
    }
    // console.log('save ', save);
  })
});

app.get('/save', function(req, res) {
  items.selectAll('Recipes', function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

