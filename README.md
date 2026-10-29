# 📚 Dự án Quản lý Thư viện Sách

Kho lưu trữ này gồm 2 phần giải quyết cùng một bài toán quản lý thư viện lớp học bằng hai cách tiếp cận khác nhau:

## 📊 So sánh Phần A (JavaScript thuần) và Phần B (React cơ bản)

| Tiêu chí | Phần A: JavaScript thuần (Vanilla JS) | Phần B: React cơ bản |
| :--- | :--- | :--- |
| **Cách thao tác DOM** | **Mệnh lệnh (Imperative):** Phải dùng thủ công các phương thức như `document.createElement`, `appendChild`, `innerHTML` để tạo, chèn và cập nhật thẻ HTML trực tiếp trên DOM thực tế. | **Khai báo (Declarative):** Tách giao diện thành các Component độc lập, render tự động thông qua **Virtual DOM** dựa trên sự thay đổi của `state`. |
| **Quản lý Trạng thái (State)** | Lưu trữ trạng thái (như danh sách yêu thích) thủ công, kết hợp lưu trữ trực tiếp vào `localStorage` và gọi lại hàm render toàn bộ khi có thay đổi. | Sử dụng **`useState`** và **`useEffect`** để quản lý state tập trung (hoặc component cấp cao) và truyền xuống các component con thông qua **`props`**. |
| **Tổ chức mã nguồn** | Viết bằng JavaScript thuần, thường gộp chung logic xử lý sự kiện, gọi API (`fetch`) và cập nhật giao diện trong các file script. | Chia nhỏ dự án thành các **Component** tái sử dụng linh hoạt (`Header`, `BookCard`, `GenreFilter`, `Section`...) và tận dụng cơ chế `children`. |
| **Hiệu năng & Tối ưu** | Khi dữ liệu lớn hoặc thay đổi nhỏ, việc thao tác trực tiếp trên DOM thực nhiều lần có thể gây ảnh hưởng đến hiệu suất rendering. | Tối ưu hóa tuyệt vời nhờ cơ chế so sánh chênh lệch (Diffing algorithm) của Virtual DOM, chỉ cập nhật chính xác phần giao diện thực sự thay đổi. |
