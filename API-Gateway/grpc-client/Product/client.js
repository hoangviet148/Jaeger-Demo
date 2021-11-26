const grpcLibrary  = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = "/home/hoang/Jaeger-Demo/API-Gateway/grpc-client/Product/productService.proto"

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const ProductService = grpcLibrary.loadPackageDefinition(packageDefinition).ProductService
const client = new ProductService('localhost:8082', grpcLibrary.credentials.createInsecure())

module.exports = client

