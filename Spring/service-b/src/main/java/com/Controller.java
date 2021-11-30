package com;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.opentracing.Scope;
import io.opentracing.Span;
import io.opentracing.Tracer;

@RestController
public class Controller 
{
    @Autowired
    private Tracer tracer;

    @GetMapping("/formatGreeting")
    public String formatGreeting(@RequestParam String name) {
        Scope scope = tracer.buildSpan("format-greeting1").startActive(true);
        Span span = scope.span();
        span.log("formatting message remotely for name " + name);

        String response = "From service-b, Hello " + name + "!";
        return response;
    }
}
