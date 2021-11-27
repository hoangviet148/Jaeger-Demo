const axios = require("axios");
const host = "http://localhost:8081/order";

module.exports.createOrder = async (req, res) => {
  try {
    let url = host + "/createOrder";

    const response = await axios.post(url, {
      userId: req.body.userId,
      products: req.body.products,
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};

module.exports.getOrderByUserId = async (req, res) => {
  try {
    let userId = req.params.userId;
    console.log(userId);
    let url = host + `/getOrderByUserId/${userId}`;

    const response = await axios.get(url);
    console.log(response.data)
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};

module.exports.getAllOrder = async (req, res) => {
  try {
    let url = host + "/getAllOrder";

    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};
