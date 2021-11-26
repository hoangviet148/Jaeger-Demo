const express = require('express')
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const events = require('events');
require("./initTracer")

const app = express()
const port = 8080
const serviceName = 'API Gateway'

const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");

// Connect database
const db = "mongodb://127.0.0.1:27017/test";
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

// Router
app.use("/", authRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);

//const initTracer = 

// Instrument every incomming request
// app.use(initTracer.tracingMiddleWare)

app.disable('etag');
let emitter = new events.EventEmitter();
emitter.setMaxListeners(0)
process.setMaxListeners(0)
app.listen(port, () => console.log(`Service ${serviceName} listening on port ${port}!`))

