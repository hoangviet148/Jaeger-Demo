const axios = require("axios");
const host = "http://localhost:8081/order";
const opentracing = require("opentracing");
const tracer = opentracing.globalTracer();

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
  // You can re-use the parent span to create a child span
  const span = tracer.startSpan("getOrderByUserId", { childOf: req.span });
  try {
    span.log({ event: "call to order service" });
    let userId = req.params.userId;
    console.log(userId);
    let url = host + `/getOrderByUserId/${userId}`;
    const headers = {};
    tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
    // const request = bent('string', headers)
    const response = await axios.get(url, {
      headers: headers,
    });
    console.log(response.data);
    // span.setTag("response", response.data);
    span.log({ event: "received response from service" });
    span.finish();
    res.status(200).json(response.data);
  } catch (err) {
    span.finish();
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
