const Chefs = require('../models/Chefs');
const { date } = require('../../lib/utils');

module.exports = {
  index(req, res) {
    Chefs.all(function(chefs) {
      return res.render('chefs/index', { chefs });
    });
  },
  create(req, res) {
    return res.render('chefs/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '')
        return res.send('Please, fill all field');
    }

    Chefs.create(req.body, function(chef) {
      return res.redirect(`/admin/chefs/${ chef.id }`);
    });
  },
  show(req, res) {
    Chefs.listChefs(req.params.id, function(chef) {
      if (!chef) return res.send('Chef not found!');

      Chefs.listRecipesChefs(req.params.id, function(recipe) {
        return res.render('chefs/show', { chef, recipe });
      });
    });
  },
  edit(req, res) {
    Chefs.find(req.params.id, function(chefs) {
      return res.render('chefs/edit', { chefs });
    });
  },
  put(req, res) {
    Chefs.update(req.body, function() {
      return res.redirect(`/admin/chefs/${ req.body.id }`);
    });
  },
  delete(req, res) {
    Chefs.delete(req.body.id, function() {
      return res.redirect('/admin/chefs');
    });
  }
}
