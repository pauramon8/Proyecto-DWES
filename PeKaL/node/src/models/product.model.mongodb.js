const User = require('./user.model');
const mongoClient = require('../services/mongodb.service');
const e = require('express');

class MongoDBUser extends User {
  constructor(database) {
    super(database);
    this.collection = mongoClient.db('wallapop').collection('products');
  }

  async create(producto ,cb) {
    const result = await this.collection.insertOne(producto);
    console.log("Producto creado", result);
    cb(null, result);
    //return result.insertedId.toString();
  }

  async getAll(cb) {
    const result = await this.collection.find().toArray();
    console.log(result);
    cb(null, result);
    
  }

  async delete(id, cb) {
    const result = await this.collection.deleteOne({ _id: id });
    cb(null, result);
    return result.deletedCount > 0;
  }
  
  async get(id, cb) {
    const result = await this.collection.findOne({ _id: id });
    cb(null, result);
    return result;
  }
}



module.exports = MongoDBUser;
