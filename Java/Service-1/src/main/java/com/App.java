package com;

import server.*;
import server.Grpc.*;
import java.util.*;
import io.grpc.*;
import io.grpc.stub.StreamObserver;

public class App {
    public static void main(String[] args) {
        try {
            // Create a new server to listen on port 8080
            Server server = ServerBuilder.forPort(8080)
                .addService(new GreetingServiceImpl())
                .build();
        
            // Start the server
            server.start();

            // Server threads are running in the background.
            System.out.println("Server started");
            // Don't exit the main thread. Wait until server is terminated.
            server.awaitTermination();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }

    static class GreetingServiceImpl extends GreetingServiceGrpc.GreetingServiceImplBase {
        @Override
        public void greeting(HelloRequest req, StreamObserver<HelloResponse> responseObserver) {
            HelloResponse response = HelloResponse.newBuilder().setGreeting("Hello " + req.getName()).build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }
}
