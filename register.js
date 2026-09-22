// ĐÃ SỬA: Lấy form đăng ký
var form = document.getElementById("registerForm");


// ĐÃ SỬA: Khi người dùng bấm nút Đăng ký
form.addEventListener("submit", function(event) {

    // Không cho trang tự tải lại
    event.preventDefault();

    // Lấy dữ liệu người dùng nhập
    var username = document.getElementById("registerUsername").value;
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra có nhập đủ thông tin không
    if (username == "" || password == "" || confirmPassword == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Kiểm tra hai mật khẩu có giống nhau không
    if (password != confirmPassword) {
        alert("Mật khẩu không giống nhau!");
        return;
    }

    // ĐÃ SỬA: Lưu tài khoản vào trình duyệt
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Thông báo đăng ký thành công
    alert("Đăng ký thành công!");

    // Chuyển sang trang đăng nhập
    window.location.href = "dangnhap.html";
});