const fs = require('fs');
const data = require('../data.json');

// home
exports.home = function(req, res) {
  return res.render('userArea/home', { recipes: data.recipes });
}

// about
exports.about = function(req, res) {
  return res.render('userArea/about');
}

// recipe
exports.recipe = function(req, res) {
  return res.render('userArea/recipes', { recipes: data.recipes });
}

// singularRecipe
exports.singularRecipe = function(req, res) {
  const { id } = req.params;

  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe)
    return res.send('Recipe not found!');

  const recipe = {
    ...foundRecipe
  }

  return res.render('userArea/recipe-page', { recipe });
}

// index
exports.index = function(req,res) {
  return res.render('admin/index', { recipes: data.recipes });
}

// create
exports.create = function(req, res) {
  return res.render('admin/create');
}

// post
exports.post = function(req,res) {
  let keys = Object.keys(req.body);
  keys.pop();

  for (key of keys) {
    if (req.body[key] == '')
      return res.send('Please, fill all field');
  }

  let {recipes_url, title, author, ingredients, preparation, information} = req.body;

  const id = Number(data.recipes.length + 1);
  // const id = req.body.title.replace(/ /g, '-').toLowerCase();

  data.recipes.push({
    id,
    recipes_url,
    title,
    author,
    ingredients,
    preparation,
    information
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send('Write file error!');

    return res.redirect(`/admin/recipes/${id}`);
  });
}

// show
exports.show = function(req, res) {
  const { id } = req.params;

  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe)
    return res.send('Recipe not found!');

  const recipe = {
    ...foundRecipe
  }

  return res.render('admin/show', { recipe });
}

// edit
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe)
    return res.send('Recipe not found!');

  const recipe = {
    ...foundRecipe
  }

  return res.render('admin/edit', { recipes: recipe });
}

// put
exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
    if (id == recipe.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundRecipe)
    return res.send('Recipe not found!');

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(req.body.id),
  }

  data.recipes[index] = recipe;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send('Write file error!');

    return res.redirect(`/admin/recipes/${id}`);
  });
}

// delete
exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredRecipes = data.recipes.filter(function(recipe) {
    return recipe.id != id;
  });

  data.recipes = filteredRecipes;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err)
      return res.send('Write file error!');

    return res.redirect('/admin/recipes');
  })
}
