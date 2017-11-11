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

var createRecipe = function(obj, query) {
  Recipe.create({
    imageUrl: obj.image_url,
    title: obj.title,
    rating: obj.social_rank,
    recipeUrl: obj.source_url,
    search: query
  })
}

var saveRecipes = function(recipeArr, query, cb) {
  for (let i = 0; i < recipeArr.length; i++) {
    Recipes.find({search: query}, function(err, recipes) {
      if (recipes.search !== query) {
        createRecipe(recipeArr[i], query);
      }
    })
    if (i === recipeArr.length - 1) {
      cb();
    }
  }
}

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
module.exports.saveRecipes = saveRecipes;