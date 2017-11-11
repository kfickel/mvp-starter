var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var search = '';

var recipeSchema = mongoose.Schema({
  imageUrl: String,
  title: String,
  rating: Number,
  recipeUrl: String,
  search: String
});

var Recipes = mongoose.model('Recipes', recipeSchema);

var createRecipe = function(obj, query) {
  Recipes.create({
    imageUrl: obj.image_url,
    title: obj.title,
    rating: obj.social_rank,
    recipeUrl: obj.source_url,
    search: query
  })
}

var saveRecipes = function(recipeArr, query, cb) {
  search = query;
  // console.log('recipeArr ', recipeArr.recipes[0]);
  for (let i = 0; i < recipeArr.recipes.length; i++) {
    // console.log('RC \n\n', recipeArr.recipes[i]);
    Recipes.find({search: query}, function(err, recipes) {
      if (recipes.search !== query) {
        createRecipe(recipeArr.recipes[i], query);
      }
    })
    if (i === recipeArr.recipes.length - 1) {
      cb();
    }
  }
}

var select = function(callback) {
  var recipes = 5;
  Recipes.find({search: search}, function(err, recipes) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes.slice(0,5));
    }
  });
}

var selectAll = function(callback) {
  console.log('HERE');
  Recipes.find().sort({ratings: -1}).exec(function(err, recipes) {
    console.log('RECIPE ', recipes);
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes.slice(0,10));
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.saveRecipes = saveRecipes;
module.exports.select = select;