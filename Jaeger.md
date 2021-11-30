## 1. Qua mỗi service hết bn giây
## 2. Qua mỗi service thì trạng thái thế nào, nếu lỗi cần rõ nguyên nhân lỗi, có cần khai báo cụ thể không hay theo giao thức
- Lỗi cần tự định nghĩa qua code chứ không tự extract ra
## 3. Tổ chức dữ liệu thế nào để thể hiện mối quan hệ trên UI
## 4. Tần suất lấy mẫu request như thế nào cho phù hợp
## 5. Có thể viết theo các func để hướng dẫn dev tích hợp vào code hay ko
## 6. Giữa các giao thức thì khai báo các tham số đo có khác nhau không
## 7. Định nghĩa lại lại span, khi nào tạo span, có phải trao đổi với dev không
## 8. Chưa thể hiện được đầu về của service

- Để có thể truyền span từ service này sang service kia thì phải extract span context ra và inject vào trong header của oubound request và gửi đi