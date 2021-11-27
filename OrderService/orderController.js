const Order = require("./orderModel");
const ObjectId = require("mongodb").ObjectID;
const axios = require("axios");


module.exports.createOrder = async (req, res) => {
  console.log(req.body);
  let newOrder = Order({
    userId: req.body.userId,
    products: req.body.products,
  });
  await newOrder.save();
  return res.json({ newOrder });
};

module.exports.getOrderByUserId = async (req, res) => {
    console.log(req.params)
    let userId = req.params.userId;
    let order = await Order.findOne({ userId: new ObjectId(userId) });
    let orderProducts = order.products;
    console.log("products: " + orderProducts)

    let url = "http://localhost:8082/product/getProductById";
    let products = [];
    for (let i = 0; i < orderProducts.length; i++) {
        console.log(url + '/' + orderProducts[i])
      let temp = await axios.get(url + '/' + orderProducts[i]);
      console.log("temp: " + temp.data)
      products.push(temp.data);
    }
    console.log(products)
    res.json({ products });
  
};

module.exports.getAllOrder = async (req, res) => {
  try {
    let orders = await Order.find();
    res.json({ orders });
  } catch (err) {
    console.log(error + " ");
    return res.status(400).json(error + " ");
  }
};
