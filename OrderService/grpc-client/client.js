const grpcLibrary  = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = "/home/hoang/learning-distributed-tracing-101/lab-jaeger-nodejs/OrderService/grpc-client/productService.proto"

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const ProductService = grpcLibrary.loadPackageDefinition(packageDefinition).ProductService
const client = new ProductService('localhost:8082', grpcLibrary.credentials.createInsecure())

module.exports = client

