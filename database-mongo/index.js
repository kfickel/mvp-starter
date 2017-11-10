var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var recipeSchema = mongoose.Schema({
  imageUrl: String,
  title: String,
  rating: Number,
  recipeUrl: String,
  search: String
});

var Recipes = mongoose.model('Recipes', recipeSchema);

var selectAll = function(callback) {
  Recipes.find({}, function(err, recipes) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

module.exports.selectAll = selectAll;