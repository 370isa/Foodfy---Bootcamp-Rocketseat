const { Pool } = require('pg');

module.exports = new Pool({
  user: 'EloisaAmorin',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'foodfy'
});
