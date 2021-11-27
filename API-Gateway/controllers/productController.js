const axios = require("axios");
const host = "http://localhost:8082/product";

module.exports.createProduct = async (req, res) => {
  console.log("API Gateway - createProduct");
  try {
    let url = host + "/createProduct";

    const response = await axios.post(url, {
      name: req.body.name,
    });
    console.log(response.data.newProduct);
    return res.status(200).json(response.data.newProduct);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    productId = req.params.productId;
    let  url = host + `/getProductById/${productId}`
    const response = await axios.get(url);
    console.log(response.data);
    res.status(200).json(response.data.product);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};

module.exports.getAllProduct = async (req, res) => {
  try {
     let url = host + "/getAllProduct"
    
    const response = await axios.get(url);
    console.log(response.data.products);
    return res.status(200).json(response.data.products);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};
