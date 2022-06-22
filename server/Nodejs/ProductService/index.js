const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("./tracer/initTracer")
const tracingMiddleWare = require("./tracer/tracingMiddleware")

const port = 8083;
const serviceName = "Product Service";

const app = express();
const productRoute = require("./productRoute");

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
app.use("/product", productRoute);

// Connect database
const db = "mongodb://mongodb-product:27017/product";
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

app.listen(port, () => console.log(`Service ${serviceName} listening on port ${port}!`))