package com.hello;


import com.google.common.collect.ImmutableMap;

import io.opentracing.Span;
import io.opentracing.Tracer;
import com.lib.Tracing;

public class HelloManual {

    private final Tracer tracer;

    private HelloManual(Tracer tracer) {
        this.tracer = tracer;
    }

    private void sayHello(String helloTo) {
        // start span "say-hello"
        Span span = tracer.buildSpan("say-hello").start();
        span.setTag("hello-to", helloTo);

        // truyền span như 1 tham số đến hàm khác
        String helloStr =  formatString(span, helloTo);
        printHello(span, helloStr);

        // finish span "say-hello"
        span.finish();
    }

    private  String formatString(Span rootSpan, String helloTo) {
        // khởi tạo span "formatString" là con của span "say-hello"
        Span span = tracer.buildSpan("formatString").asChildOf(rootSpan).start();
        try {
            String helloStr = String.format("Hello, %s!", helloTo);
            // capture lại event format string
            span.log(ImmutableMap.of("event", "string-format", "value", helloStr));
            return helloStr;
        } finally {
            // kết thúc span "formatString"
            span.finish();
        }
    }

    private void printHello(Span rootSpan, String helloStr) {
        // khởi tạo span "formatString" là con của span "say-hello"
        Span span = tracer.buildSpan("printHello").asChildOf(rootSpan).start();
        try {
            System.out.println(helloStr);
            // capture lại event print
            span.log(ImmutableMap.of("event", "println"));
        } finally {
            // kết thúc span "println"
            span.finish();
        }
    }

    public static void main(String[] args) {
        if (args.length != 1) {
            throw new IllegalArgumentException("Expecting one argument");
        }

        String helloTo = args[0];
        try (Tracer tracer = Tracing.init("hello-world")) {
            // start trace
            new HelloManual(tracer).sayHello(helloTo);
        }
    }
}