# 1. Overview
- Istio sinh ra các trace span cho mỗi service. Mỗi http request sẽ có các thông tin sau trong headers:
    ![](https://i0.wp.com/piotrminkowski.com/wp-content/uploads/2022/01/Screenshot-2022-01-30-at-00.31.05.png?resize=768%2C442&ssl=1)

- Mỗi request đến từ istio gateway chứa X-B3-SpanId, X-B3-TraceId, X-B3-request-id, X-B3-parentspanid, X-B3-sampled

- Istio không quảng bá các B3 header này trong client request, vậy nên để hệ thống có thể hiểu được trace, ta phải thêm các B3 header này vào request trong code.

- Khác biệt so với sử dụng opentracing là ta chỉ cần chèn thêm header tại một service và headers này sẽ được di chuyển qua các service còn lại giúp ta có được 1 trace hoàn chỉnh
    ![](./images/traceid.png)

# 2. Demo
- Ta có một ứng dụng sử dụng microservice gồm 3 service: billing, eshop, inventory, delivery với http request flow như hình dưới:
    ![](https://miro.medium.com/max/432/0*ONqARj07oy9zZ6eV.jpg)

- header được nhúng tại service eshop và được chuyển qua các service khác tạo thành trace hoàn chỉnh
  ![](./images/code.PNG)

- Kết quả thu được
  ![](https://miro.medium.com/max/700/0*Y4z2dPIsE3Cwoz1N.jpg)