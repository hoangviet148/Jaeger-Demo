const axios = require("axios");
const host = "http://localhost:8082/order";
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
  console.log("req.span: ", req.span._spanContext)
  span.setTag(opentracing.Tags.PEER_SERVICE, "API Gateway");
  try {
    span.log({ event: "call to order service" });
    let userId = req.params.userId;
    // console.log(userId);
    let orderURL = `http://order-service:8082/order/getOrderByUserId/${userId}`;
    let employeeURL = 'http://spring:8080/api/tutorial/1.0/employees/1'
    const headers = {};
    tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
    console.log("headers: ", headers)
    const orderResponse = await axios.get(orderURL, {
      headers: headers,
    });
    // const employeeResponse = await axios.get(employeeURL, {
    //   headers: headers,
    // });
    console.log(orderResponse.data);
    // span.setTag("response", response.data);
    span.log({ event: "received response from service" });
    span.finish();
    res.status(200).json(orderResponse.data);
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
