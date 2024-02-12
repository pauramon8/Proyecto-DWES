MongoDBUser = require('../models/product.model.mongodb.js');


const { ObjectId } = require('mongodb');

const auth = require('../services/auth.service.js');

// Crear instancia de modelo dependiendo de la base de datos
const dbType = process.env.DB_TYPE || 'mysql';
let productModel;
console.log(dbType);
switch (dbType) {
  case 'mysql':
    productModel = new MysqlUser();
    break;
  case 'mongodb':
    productModel = new MongoDBUser();
    break;
  case 'redis':
    productModel = new RedisUser();
    break;
  default:
    productModel = new RedisUser();
}

// Create a new product
exports.create = (req, res) => {
    const product = req.body;
    // check if any value is missing
    if (!product.name || !product.desc || !product.price) {
      return res.status(400).send({
        message: "Content can not be empty"
      });
    }
    console.log("Producto a crear", product);
    productModel.create(product, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Some error occurred while creating the product."
        });
      }
      return res.status(201).send(result);
    });
  };

  exports.findAll = (req, res) => {
    productModel.getAll((err, result) => {
      if (err) return res.status(500).send(err);
      let productos = {};
      for (let id in result) {
        let products = (result[id]);
        productos[id] = products;
      }
      res.status(200).send(Object.values(productos));
    });
  }
  

// Delete a product with the specified id in the request

exports.delete = (req, res) => {
  const productId = req.params.id;
  const objectId = new ObjectId(productId);
  productModel.delete(objectId, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({
      message: "Product deleted successfully"
    });
  });
};


// Retrive ONE product with the specified id in the request
exports.findOne = (req, res) => {
  const userId = req.params.id;
  const objectId = new ObjectId(userId);
  productModel.get(objectId, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(404).send("User not found");
    res.status(200).send(result);
  });
};

