const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chefsname
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`,
      function(err, results) {
        if (err) throw 'Database Error!';

        callback(results.rows);
      }
    );
  },
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef_id
    ];

    db.query(query, values, function(err, results) {
      if (err) throw 'Database Error!';

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chefsname
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1`, [id], function(err, results) {
        if (err) throw 'Database Error!';

        callback(results.rows[0]);
      }
    );
  },
  findBy(filter, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chefsname
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'
    `, function(err, results) {
      if(err) throw 'Database Error!';

      callback(results.rows);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
        chef_id=($6)
      WHERE id = $7
    `;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef_id,
      data.id
    ];

    db.query(query, values, function(err, results) {
      if (err) throw 'Database Error!';

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
      if (err) throw 'Database Error!';

      return callback();
    });
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT * FROM chefs`, function(err, results) {
      if (err) throw 'Database Error!';

      callback(results.rows);
    });
  },
  listChefs(callback) {
    db.query(`
      SELECT chefs.*, COUNT(recipes.*) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
      ORDER BY chefs.name
    `, function(err, results) {
      if (err) throw 'Database Error!';

      callback(results.rows);
    });
  }
}
