const caller  = require('grpc-caller')
const PROTO_PATH = "/home/hoang/Jaeger-Demo/OrderService/grpc-client/productService.proto"

//const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
//const ProductService = grpcLibrary.loadPackageDefinition(packageDefinition).ProductService
const client = caller('localhost:8082', PROTO_PATH, 'ProductService')

module.exports = client

