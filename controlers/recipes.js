const Recipes = require('../models/Recipes');
const { date } = require('../../lib/utils');

module.exports = {
  index(req,res) {
    Recipes.all(function(recipes) {
      return res.render('admin/index', { recipes });
    });
  },
  create(req, res) {
    Recipes.chefsSelectOptions(function(options) {
      return res.render('admin/create', { chefOptions: options });
    });
  },
  post(req,res) {
    let keys = Object.keys(req.body);
    keys.pop();

    for (key of keys) {
      if (req.body[key] == '')
        return res.send('Please, fill all field');
    }

    Recipes.create(req.body, function(recipes) {
      return res.redirect(`/admin/recipes/${ recipes.id }`);
    });
  },
  show(req, res) {
    Recipes.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Recipe not found!');

      recipe.ingredients = recipe.ingredients.replace(/[{}"]+/g, '');
      recipe.ingredients = recipe.ingredients.split(',');
      recipe.preparation = recipe.preparation.replace(/[{}"]+/g, '');
      recipe.preparation = recipe.preparation.split(',');

      return res.render('admin/show', { recipe });
    });
  },
  edit(req, res) {
    Recipes.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Recipe not found!');

      recipe.ingredients = recipe.ingredients.replace(/[{}"]+/g, '');
      recipe.ingredients = recipe.ingredients.split(',');
      recipe.preparation = recipe.preparation.replace(/[{}"]+/g, '');
      recipe.preparation = recipe.preparation.split(',');

      Recipes.chefsSelectOptions(function(options) {
        return res.render('admin/edit', { recipes: recipe, chefOptions: options });
      });
    });
  },
  put(req, res) {
    let keys = Object.keys(req.body);
    keys.pop();

    for (key of keys) {
      if (req.body[key] == '')
        return res.send('Please, fill all field');
    }

    Recipes.update(req.body, function() {
      return res.redirect(`/admin/recipes/${ req.body.id }`);
    });
  },
  delete(req, res) {
    Recipes.delete(req.body.id, function() {
      return res.redirect('/admin/recipes');
    });
  }
}

