const Order = require("./orderModel");
const ObjectId = require("mongodb").ObjectID;
const axios = require("axios");
const opentracing = require("opentracing");
const tracer = opentracing.globalTracer();

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
  // You can re-use the parent span to create a child span
  const span = tracer.startSpan("getOrderByUserId", { childOf: req.span });
  console.log("req.span: ", req.span._spanContext)
  span.setTag(opentracing.Tags.PEER_SERVICE, "Order Service");
  try {
    console.log("params: ", req.span);
    let userId = req.params.userId;
    span.log({ event: "get product id from databases" });
    let order = await Order.findOne({ userId: new ObjectId(userId) });
    let orderProducts = order.products;
    span.log({ event: "done get product id from databases" });
    console.log("products: " + orderProducts);
    const headers = {};
    tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
    let urlTemp = "http://product-service:8083/product/getProductById";
    let products = [];
    //throw "err"
    for (let i = 0; i < orderProducts.length; i++) {
      let url = urlTemp + "/" + orderProducts[i];
      console.log(url);
      span.log({ event: `call to product service to get ${orderProducts[i]}` });
      let temp = await axios.get(url, {
        headers: headers,
      });
      //let temp = await axios.get(url);
      span.log({
        event: `done call to product service to get ${orderProducts[i]}`,
      });
      console.log("temp: " + temp.data);
      products.push(temp.data);
    }
    console.log(products);
    span.finish();
    res.json({ products });
  } catch (err) {
    span.log({ event: 'error at getOrderByUserId span' });
    span.setTag(opentracing.Tags.ERROR, true);
    span.finish()
    return res.status(400).json({ err });
  }
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
