package com;

import java.net.URI;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import io.opentracing.Scope;
import io.opentracing.Span;
import io.opentracing.Tracer;

@RestController
public class Controller {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private Tracer tracer;

    @GetMapping("/sayHello/{name}")
    public String sayHello(@PathVariable String name) {
        try {
            Scope scope = tracer.buildSpan("say-hello-handler").startActive(true);
            Span span = scope.span();
            Map<String, String> fields = new LinkedHashMap<>();
            fields.put("event", name);
            fields.put("message", "this is a log message for name " + name);
            span.log(fields);
            String response = formatGreetingRemote(name);
            span.setTag("response", response);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    private String formatGreeting(String name) {
        try {
            Scope scope = tracer.buildSpan("format-greeting").startActive(true);
            Span span = scope.span();
            span.log("formatting message locally for name " + name);
            String response = "Hello " + name + "!";
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    private String formatGreetingRemote(String name) {
        try {
            String serviceName = System.getenv("SERVICE_FORMATTER");
            if (serviceName == null) {
                serviceName = "localhost";
            }
            String urlPath = "http://" + serviceName + ":8081/formatGreeting";
            URI uri = UriComponentsBuilder //
                    .fromHttpUrl(urlPath) //
                    .queryParam("name", name).build(Collections.emptyMap());
            ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @GetMapping("/error")
    public ResponseEntity<String> replyError() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
