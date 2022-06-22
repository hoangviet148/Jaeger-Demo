const express = require('express')
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const events = require('events');
require("./tracer/initTracer")

const app = express()
const port = 8081
const serviceName = 'API Gateway'

const tracingMiddleWare = require("./tracer/tracingMiddleware")
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");

// Connect database
const db = "mongodb://mongodb-auth:27017/auth";
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Error in DB connection: " + err);
    } else {
      console.log("MongoDB Connection Succeeded.");
    }
  }
);

// Middleware
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(logger("dev"));
app.use(
  cors({
    exposedHeaders: "*",
  })
);

// Instrument every incomming request
app.use(tracingMiddleWare)

// Router
app.use("/", authRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);


app.disable('etag');
let emitter = new events.EventEmitter();
emitter.setMaxListeners(0)
process.setMaxListeners(0)
app.listen(port, () => console.log(`Service ${serviceName} listening on port ${port}!`))

