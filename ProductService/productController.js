const Product = require("./productModel");
const ObjectId = require("mongodb").ObjectID;
const opentracing = require("opentracing");
const tracer = opentracing.globalTracer();

module.exports.createProduct = async (req, res) => {
  console.log("Product Service - createProduct");
  let newProduct = new Product({
    name: req.body.name,
  });
  await newProduct.save();
  return res.json({ newProduct });
};

module.exports.getProductById = async (req, res) => {
  const span = tracer.startSpan("getProductById", { childOf: req.span });

  try {
    span.log({ event: `get product by id from database ` });
    productId = req.params.productId;
    
    let product = await Product.findOne({ _id: new ObjectId(productId) });
    span.log({ event: `done get product by id from database ` });
    span.finish();
    return res.json({ product });
  } catch (err) {
    console.log(err + " ");
    span.finish();
    return res.status(400).json({ err });
  }
};

module.exports.getAllProduct = async (req, res) => {
  let products = await Product.find();
  return res.json({ products });
};
