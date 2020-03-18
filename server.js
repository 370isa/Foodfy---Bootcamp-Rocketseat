const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');
const server = express();

const port = 8080;

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);

server.set('view engine', 'njk');
nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(port, function() {
  console.log('Server started at http://localhost:%s', port);
});
