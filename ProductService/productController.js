const Product = require("./productModel");
const ObjectId = require("mongodb").ObjectID;

module.exports.createProduct = async (req, res) => {
  let newProduct = {
    name: req.body.name,
  };
  await newProduct.save();
  return res.json(newProduct);
};

module.exports.getProductById = async (req, res) => {
  productId = req.params.productId;
  let product = await Product.findOne({ _id: new ObjectId(productId) });
  return res.json(product);
};

module.exports.getAllProduct = async (req, res) => {
  let products = await Product.find();
  return res.json(products);
};
