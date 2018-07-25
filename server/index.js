var express = require('express');
var bodyParser = require('body-parser');
var foodFork = require('../foodFork/foodFork.js');
var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

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
  items.selectAll('Recipes', function(err, data) {
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
      if (save.slice(i, i+3) === '...') {
        var title = save.slice(1,i);
        var query = save.slice(i+3);
        items.userRecipes(title, query, function() {
          res.send('')
        })
      }
    }
  })
});

app.get('/save', function(req, res) {
  items.selectAll('ReSaveRecipes', function(err, data) {
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

