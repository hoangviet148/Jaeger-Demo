package com;

import io.opentracing.Tracer;
import io.jaegertracing.internal.JaegerTracer;
import io.jaegertracing.Configuration;
import io.jaegertracing.Configuration.ReporterConfiguration;
import io.jaegertracing.Configuration.SamplerConfiguration;

public class App {
    private static Tracer tracer;

    private App(Tracer tracer) {
        this.tracer = tracer;
    }

    public static void main(String[] args) {
        if(args.length != 1) {
            throw new IllegalArgumentException("One argument is mandotary !");
        }
        String helloServiceArgs = args[0];
        tracer = initTracer("hello world!");
        new App(tracer).sayHello(helloServiceArgs);
    }

    private void sayHello(String helloServiceArgs) {
        String fromHello = String.format("Hello, %s", helloServiceArgs);
        System.out.println(fromHello);
    }

    public static Tracer initTracer(String service) {
        SamplerConfiguration samplerConfig = new SamplerConfiguration().withType("const").withParam(1);
		ReporterConfiguration reporterConfig = ReporterConfiguration.fromEnv().withLogSpans(true);
		return Configuration.fromEnv("App").withSampler(samplerConfig).withReporter(reporterConfig).getTracer();
    }
}