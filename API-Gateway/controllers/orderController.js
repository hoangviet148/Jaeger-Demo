const host = "http://localhost:8082/order";

module.exports.createOrder = async (req, res) => {
  try {
    let newOrder = {
      name: req.body.name,
    };

    let options = {
      uri: host + "createOrder",
      body: JSON.stringify(newOrder),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await request(options);
    res.status(200).json(response);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};

module.exports.getOrderByUserId = async (req, res) => {
  try {
    let userId = req.params.userId;
    console.log(userId);
    let user = await User.findOne({ _id: userId });
    let options = {
      uri: host + `getOrderByUserId/${userId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await request(options);
    res.status(200).json(response);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};

module.exports.getAllOrder = async (req, res) => {
  try {
    let options = {
      uri: host + "getAllOrder",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await request(options);
    res.status(200).json(response);
  } catch (err) {
    console.log(err + " ");
    res.status(400).json(err + " ");
  }
};
