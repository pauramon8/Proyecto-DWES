const User = require('./user.model');
const mysqlClient = require('../services/mysql.service');

class MysqlUser extends User {
  constructor(database) {
    super(database);
    this.mysqlClient = mysqlClient;
  }

  create(user, cb) {
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const values = [user.name, user.email, user.password];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  }

  get(id, cb) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const values = [id];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      if (result.length === 0) return cb(null, null);

      const user = {
        name: result[0].name,
        email: result[0].email,
        password: result[0].password
      };
      user.id = result[0].id;
      cb(null, user);
    });
  }

  getAll(cb) {
    const query = `SELECT * FROM users`;

    this.mysqlClient.query(query, (err, results) => {
      if (err) return cb(err);
      console.log(results);
      const users = results.map((result) => {
        const user = {
          name: result.name,
          email: result.email,
          password: result.password,
          isAdmin: result.isAdmin
        };
        user.id = result.id;
        return user;
      });

      cb(null, users);
    });
  }

  getByEmail(email, cb) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      if (result.length === 0) return cb(null, null);

      const user = {
        name: result[0].name,
        email: result[0].email,
        password: result[0].password
      };
      user.id = result[0].id;
      cb(null, user);
    });
  }

  update(id, updates, cb) {
    const query = `UPDATE users SET ? WHERE id = ?`;
    const values = [updates, id];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) {return cb(err)}
      cb(null, result.changedRows);
    });
  }

  delete(id, cb) {
    const query = `DELETE FROM users WHERE id = ?`;
    const values = [id];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  }
}

module.exports = MysqlUser;