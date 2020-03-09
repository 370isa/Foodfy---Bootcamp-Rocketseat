const express = require('express');
const nunjucks = require('nunjucks');
const recipes = require('./data');

const server = express();
const port = 8080;

server.use(express.static('public'));

server.set('view engine', 'njk');
nunjucks.configure('views', {
  express: server,
  noCache: true
});

server.get('/', function(req, res) {
  return res.render('index', { recipes });
});

server.get('/about', function(req, res) {
  return res.render('about', { pageAbout: 'active' });
});

server.get('/recipes', function(req, res) {
  return res.render('recipes', { recipes, pageRecipes: 'active' });
});

server.get('/recipe', function(req, res) {
  const id = req.query.id;

  const recipe = recipes.find(function(recipe) {
    return recipe.id == id;
  });

  return res.render('recipe-page', { recipe });
});

server.listen(port, function() {
  console.log('Server started at http://localhost:%s', port);
});
