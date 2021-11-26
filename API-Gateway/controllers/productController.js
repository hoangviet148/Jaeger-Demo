const host = "http://localhost:8081/product";

module.exports.createProduct = async (req, res) => {
  try {
    let newProduct = {
      name: req.body.name,
    };

    let options = {
      uri: host + "createProduct",
      body: JSON.stringify(newProduct),
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

module.exports.getProductById = async (req, res) => {
  try {
    productId = req.params.productId;
    let options = {
      uri: host + `getProductById/${productId}`,
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

module.exports.getAllProduct = async (req, res) => {
  console.log(1);
  try {
    let options = {
      uri: host + "getAllProduct",
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
