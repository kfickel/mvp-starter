// var http = require('http');
// var jq = require('jquery');
var request = require('request');
var api = require('../config.js');
var db = require('../database-mongo/index.js');

var foodFork = function(recipe, cb) {
  console.log('recipe ', recipe)
  // console.log('url ', `http://food2fork.com/api/search?key=${api}&q=${query}`);
  var options = {
    uri: `http://food2fork.com/api/search`,
    method:"GET",
    qs: {
      key: api,
      q: recipe
    },
    headers: {
      'User-Agent': 'request'
    }
  }

  request(options, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var recipes = JSON.parse(body);
      db.saveRecipes(recipes, recipe, cb);
      // console.log('BODY ', recipes);
    } else {
      console.log('ERROR ', err);
      // cb()
    }
  })
  // jq.ajax({
  //   url: 'http://food2fork.com/api/search',
  //   data: {
  //     key: api,
  //     q: recipe
  //   },
  //   success: function(res) {
  //     console.log('FOOD FORK ', res);
  //   },
  //   error: function(err) {
  //     console.log('ERR ', err);
  //   }
  // });
}

module.exports = foodFork;