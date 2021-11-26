const grpcLibrary  = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = "/home/hoang/Jaeger-Demo/API-Gateway/grpc-client/Order/orderService.proto"

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const OrderService = grpcLibrary.loadPackageDefinition(packageDefinition).OrderService
const client = new OrderService('localhost:8081', grpcLibrary.credentials.createInsecure())

module.exports = client
