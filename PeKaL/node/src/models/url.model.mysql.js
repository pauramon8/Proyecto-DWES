const database = require('../services/mysql.service');
const Url = require('./url.model');
const mysql = require('mysql2');
const config = require('../config/config');

class MysqlUrl extends Url {
  constructor() {
    super(database);
  }

  create(url, cb) {
    this.database.query(
      'INSERT INTO urls (short_url, original_url, user_id) VALUES (?, ?, ?)',
      [url.shortenedUrl, url.originalUrl, url.userId],
      (error, results) => {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  }

  get(id, cb) {
    this.database.query(
      'SELECT * FROM urls WHERE short_url = ?',
      [id],
      (error, results) => {
        if (error) return cb(error);
        if (results.length === 0) return cb(null, null);
        cb(null, results[0]);
      }
    );
  }

  getAll(cb) {
    this.database.query('SELECT * FROM urls', (error, results) => {
      if (error) return cb(error);
      cb(null, results);
    });
  }

  update(id, url, cb) {
    this.database.query(
      'UPDATE urls SET ? WHERE short_url = ?',
      [url, id],
      (error, results) => {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  }

  getOriginalUrl(originalUrl, cb) {
    this.database.query(
      'SELECT * FROM urls WHERE original_url = ?',
      [originalUrl],
      (error, results) => {
        if (error) return cb(error);
        if (results.length === 0) return cb(null, null);
        cb(null, results[0]);
      }
    );
  }

  delete(id, cb) {
    this.database.query(
      'DELETE FROM urls WHERE short_url = ?',
      [id],
      (error, results) => {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  }
}

module.exports = MysqlUrl;
