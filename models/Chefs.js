const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM chefs`, function(err, results) {
      if (err) throw 'Database Error!';

      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ];

    db.query(query, values, function(err, results) {
      if (err) throw 'Database Error!';

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT * FROM chefs WHERE id = $1`, [id], function(err, results) {
        if (err) throw 'Database Error!';

        callback(results.rows[0]);
      }
    );
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `;

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ];

    db.query(query, values, function(err, results) {
      if (err) throw 'Database Error!';

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
      if (err) throw `Database Error! - ${err}`;

      return callback();
    });
  },
  listChefs(id, callback) {
    db.query(`
      SELECT chefs.*, COUNT(recipes.*) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
    `, [id], function(err, results) {
      if (err) throw `Database Error! - ${err}`;

      callback(results.rows[0]);
    });
  },
  listRecipesChefs(chef_id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chefsname
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.chef_id = $1
    `, [chef_id], function(err, results) {
      if (err) throw 'Database Error!';

      callback(results.rows);
    });
  }
}
