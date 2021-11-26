const grpc = require('grpc')
const mongoose = require("mongoose");
let ObjectId = require('mongodb').ObjectID;
let protoLoader = require("@grpc/proto-loader");
let client = require("./grpc-client/client");
require("./initTracer")


const app = new grpc.Server()
const port = 8081
const serviceName = 'Order Service'
const Order = require("./orderModel");
const PROTO_PATH = "/home/hoang/Jaeger-Demo/OrderService/orderService.proto"

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
let orderProto = grpc.loadPackageDefinition(packageDefinition);

// Connect database
const db = "mongodb://127.0.0.1:27019/test";
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

app.addService(orderProto.OrderService.service, {
    createOrder: async (call, callback) => {
        console.log(call.request)
        let order = call.request;
        let newOrder = new Order({
            userId: order.userId,
            products: order.products
        });
        await newOrder.save();
        callback(null, newOrder);
    },
    getOrderByUserId: async (call, callback) => {
        console.log(call.request)
        let userId = call.request.id;
        let order = await Order.findOne({ "userId": new ObjectId(userId) })
        let orderProducts = order.products
        let products = []

        for (let i = 0; i < orderProducts.length; i++) {
            let temp = await client.getProductById({ id: orderProducts[i] })
            console.log(temp)
            products.push(temp)
        }
        console.log(products)
        callback(null, { products });
    },
    getAllOrder: async (_, callback) => {
        let orders = await Order.find()
        callback(null, { orders })
    }
})

app.bind(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at http://192.168.75.122:${port}`)
app.start()