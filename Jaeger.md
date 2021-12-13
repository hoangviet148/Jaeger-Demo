## Các khái niệm

![](https://opentracing.io/img/OTHT_2.png)

![](https://opentracing.io/img/OTHT_3.png)

![](https://opentracing.io/img/overview-intro/tracing1_0.png)

- Trace: Là một request trong hệ phân tán (tập hợp của nhiều span)
- Span: 
  - Là một phần của workflow, đại diện cho một đơn vị xử lý logic trong hệ thống. VD: thực hiện query vào db, thực hiện lời gọi đến một service khác, ...
  - Mỗi span chứa:
    - Operation name
    - start time và finish time
    - Tags: chứa thông tin về trace data (những giá trị tồn tại trong suốt span)
    - Logs: capture lại những event trong span (debug)
    - SpanContext: chứa traceID, spanID và các thông tin khác giúp quảng bá trace ra các service khác
    ![](https://opentracing.io/img/overview:tracers/Extract.png)

- Span Example 
```
    t=0            operation name: db_query               t=x

     +-----------------------------------------------------+
     | · · · · · · · · · ·    Span     · · · · · · · · · · |
     +-----------------------------------------------------+

Tags:
- db.instance:"customers"
- db.statement:"SELECT * FROM mytable WHERE foo='bar'"
- peer.address:"mysql://127.0.0.1:3306/customers"

Logs:
- message:"Can't connect to mysql server on '127.0.0.1'(10061)"

SpanContext:
- trace_id:"abc123"
- span_id:"xyz789"
- Baggage Items:
  - special_id:"vsid1738"
```