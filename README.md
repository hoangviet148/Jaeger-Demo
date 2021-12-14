# 1. Một số khái niệm trong jaeger

|||
|-|-|
|![](https://opentracing.io/img/OTHT_2.png)|![](https://opentracing.io/img/OTHT_3.png)|


## Trace
- Là một logic xử lý trong hệ thống, thường là 1 request
## Span
- Là một phần của 1 trace, đại diện cho một đơn vị logic xử lý trong hệ thống
- Mỗi span chứa
  - Operation name
  - Duration 
  - Tags: chứa thông tin về trace data (những giá trị tồn tại trong suốt span)
  - Logs: capture lại những event xảy ra trong span (thường dùng để debug) - https://github.com/opentracing/specification/blob/master/semantic_conventions.md
  - SpanContext: chứa traceID, spanID và các thông tin khác(baggage) giúp quản bá trace ra các service khác

    ![](https://opentracing.io/img/overview-intro/tracing1_0.png)

# 2. Cấu trúc source code
## package "hello"
- Khởi tạo một Tracer
- Tạo một trace đơn giản
- Trace cụ thể một function
- Kết hợp nhiều span trong một trace
- Cách truyền trace context
```
bash run.sh com.hello.HelloActive Bryan
bash run.sh com.hello.HelloManual Bryan
``` 

## package "distributed_system"
- Trace một request trong hệ thống nhiều services
- Truyền context qua nhiều service sử dụng "Inject" và "Extract"
- Sử dụng OpenTracing-recommended tags
```
- Formatter service
bash run.sh com.distributed_system.Formatter server (run service)
curl "localhost:8081/format?helloTo=Bryan" (test service)

- Publisher service
bash run.sh com.distributed_system.Publisher server (run service)
curl "localhost:8082/publish?helloStr=hi%20there" (test service)

- Call 2 service from main
bash run.sh com.distributed_system.Hello Bryan
```

## package "baggage"
- Quảng bá context trong môi trường phân tán
- Sử dụng baggage để truyền data giữa các service 
```
- Formatter service
bash run.sh com.distributed_system.Formatter server (run service)

- Publisher service
bash run.sh com.distributed_system.Publisher server (run service)

- Call 2 service from main
bash run.sh com.distributed_system.Hello Bryan Bonjour (thêm baggage là "Bonjour")
```

# 3. Tham khảo
- https://www.katacoda.com/courses/opentracing
- https://opentracing.io/docs/
- https://www.jaegertracing.io/docs/1.29/client-libraries/