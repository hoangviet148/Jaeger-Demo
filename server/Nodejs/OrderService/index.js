const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("./tracer/initTracer")
const events = require('events');

const tracingMiddleWare = require("./tracer/tracingMiddleware")

const port = 8082;
const serviceName = "Order Service";

const app = express();
const orderRoute = require("./orderRoute");

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
app.use(tracingMiddleWare)

// Router
app.use("/order", orderRoute);

// Connect database
const db = "mongodb://mongodb-order:27017/order";
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
let emitter = new events.EventEmitter();
emitter.setMaxListeners(0)
process.setMaxListeners(0)
app.listen(port, () => console.log(`Service ${serviceName} listening on port ${port}!`))