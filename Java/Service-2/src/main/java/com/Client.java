package com;

import client.*;
import client.Grpc.*;
import io.grpc.Channel;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import io.grpc.StatusRuntimeException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Client {
    
    public static void main(String[] args) {
        String user = "hoang";

        String target = "localhost:8080";

        if (args.length > 0) {
            user = args[0];
        }
        if (args.length > 1) {
            target = args[1];
        }

        try {
            final ManagedChannel channel = ManagedChannelBuilder.forTarget(target)
                .usePlaintext()
                .build();
            final GreetingServiceGrpc.GreetingServiceBlockingStub blockingStub = GreetingServiceGrpc.newBlockingStub(channel);
            HelloRequest request = HelloRequest.newBuilder().setName(user).build();
            HelloResponse response = blockingStub.greeting(request);
            channel.shutdownNow();
        } finally {
            // channel.shutdownNow();
        }
    }
}
