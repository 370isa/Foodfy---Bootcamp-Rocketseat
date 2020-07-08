const Recipes = require('../models/Recipes');

module.exports = {
  index(req, res) {
    if (req.query.filter) {
      Recipes.findBy(req.query.filter, function(recipes) {
        return res.render('userArea/findBy', { recipes, filter: req.query.filter });
      });
    } else {
      Recipes.all(function(recipes) {
        return res.render('userArea/index', { recipes });
      });
    }
  },
  about(req, res) {
    return res.render('userArea/about');
  },
  recipes(req, res) {
    Recipes.all(function(recipes) {
      if (!recipes) return res.send('Recipe not found!');

      for(var key in recipes) {
        recipes[key].ingredients = recipes[key].ingredients.replace(/[{}"]+/g, '');
        recipes[key].ingredients = recipes[key].ingredients.split(',');
        recipes[key].preparation = recipes[key].preparation.replace(/[{}"]+/g, '');
        recipes[key].preparation = recipes[key].preparation.split(',');
      }

      return res.render('userArea/recipes', { recipes });
    });
  },
  showRecipe(req, res) {
    Recipes.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Recipe not found!');

      recipe.ingredients = recipe.ingredients.replace(/[{}"]+/g, '');
      recipe.ingredients = recipe.ingredients.split(',');
      recipe.preparation = recipe.preparation.replace(/[{}"]+/g, '');
      recipe.preparation = recipe.preparation.split(',');

      return res.render('userArea/showRecipe', { recipe });
    });
  },
  chefs(req, res) {
    Recipes.listChefs(function(chefs) {
      return res.render('userArea/chefs', { chefs });
    });
  }
}
