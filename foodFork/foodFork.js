// var http = require('http');
var jq = require('jquery');
// var request = require('request');
var api = require('../config.js');

var foodFork = function(recipe, cb) {
  console.log('recipe ', recipe)
  jq.ajax({
    url: 'http://food2fork.com/api/search',
    type: 'GET',
    data: {
      key: api,
      q: recipe
    },
    success: function(res) {
      console.log('FOOD FORK ', res);
    },
    error: function(err) {
      console.log('ERR ', err);
    }
  });
}

module.exports = foodFork;