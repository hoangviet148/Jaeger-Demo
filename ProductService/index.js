const grpc = require('grpc')
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var protoLoader = require("@grpc/proto-loader");
require("./initTracer")

const app = new grpc.Server()
const port = 8082
const serviceName = 'Product Service'
const Product = require("./productModel");
const PROTO_PATH = "/home/hoang/Jaeger-Demo/ProductService/productService.proto"

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {

})
let productProto = grpc.loadPackageDefinition(packageDefinition);

// Connect database
const db = "mongodb://127.0.0.1:27018/test";
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

app.addService(productProto.ProductService.service, {
    createProduct: async (call, callback) => {
        console.log(call.request)
        let product = call.request;
        let newProduct = new Product({
            name: product.name,
        });
        await newProduct.save();
        callback(null, newProduct);
    },
    getProductById: async (call, callback) => {
        console.log(call.request)
        let productId = call.request.id;
        let product = await Product.findOne({ "_id": new ObjectId(productId) })
        callback(null, product);
    },
    getAllProduct: async (_, callback) => {
        let products = await Product.find()
        callback(null, { products })
    }
})

app.bind(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at http://192.168.75.122:${port}`)
app.start()