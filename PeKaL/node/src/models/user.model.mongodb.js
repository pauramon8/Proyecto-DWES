const User = require('./user.model');
const mongoClient = require('../services/mongodb.service');
const e = require('express');

class MongoDBUser extends User {
  constructor(database) {
    super(database);
    this.collection = mongoClient.db('wallapop').collection('users');
  }

  async create(user ,cb) {
    const result = await this.collection.insertOne(user);
    console.log("Usuario creado", result);
    cb(null, result);
    return result.insertedId.toString();
  }

  async get(id, cb) {
    const result = await this.collection.findOne({ _id: id });
    cb(null, result);
    return result;
  }

  async getAll(cb) {
    const result = await this.collection.find().toArray();
    cb(null, result);
    return result;
  }

  async getByEmail(email, cb) {
    const result = await this.collection.findOne({ email: email });
    cb(null, result);
    return result;
  }

  async getIdByEmail(email) {
    const result = await this.collection.findOne({ email: email }, { projection: { _id: 1 } });
    return result && result._id.toString();
  }

  async update(id, updates, cb) {
    const result = await this.collection.updateOne({ _id: id }, { $set: updates });
    cb(null, result);
    return result.modifiedCount > 0;
  }

  async delete(id, cb) {
    const result = await this.collection.deleteOne({ _id: id });
    cb(null, result);
    return result.deletedCount > 0;
  }
}

module.exports = MongoDBUser;
