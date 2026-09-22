// JavaScript cơ bản cho ĐĂNG NHẬP và ĐĂNG KÝ

// ĐÃ SỬA: Kiểm tra trang nào đang mở để dùng chung file JS.
var loginForm = document.getElementById("loginForm");
var registerForm = document.getElementById("registerForm");

// =========================
// ĐĂNG NHẬP
// =========================
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var message = document.getElementById("message");

        // ĐÃ SỬA: Lấy tài khoản đã đăng ký từ localStorage.
        var savedUsername = localStorage.getItem("username");
        var savedPassword = localStorage.getItem("password");

        if (username === "" || password === "") {
            message.textContent = "Vui lòng nhập đầy đủ thông tin!";
            message.style.color = "red";
            return;
        }

        if (username === savedUsername && password === savedPassword) {
            message.textContent = "Đăng nhập thành công!";
            message.style.color = "green";

            // ĐÃ SỬA: Đường dẫn đúng về folder than.
            setTimeout(function() {
                window.location.href = "../than/than.html";
            }, 500);
        } else {
            message.textContent = "Sai tên đăng nhập hoặc mật khẩu!";
            message.style.color = "red";
        }
    });
}

// =========================
// ĐĂNG KÝ
// =========================
if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var message = document.getElementById("message");

        if (username === "" || password === "" || confirmPassword === "") {
            message.textContent = "Vui lòng nhập đầy đủ thông tin!";
            message.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Mật khẩu không giống nhau!";
            message.style.color = "red";
            return;
        }

        // ĐÃ SỬA: Lưu tài khoản đơn giản bằng localStorage.
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        message.textContent = "Đăng ký thành công!";
        message.style.color = "green";

        setTimeout(function() {
            window.location.href = "dangnhap.html";
        }, 500);
    });
}
// =========================
// GOOGLE / FACEBOOK
// =========================

var googleLogin = document.getElementById("googleLogin");
var facebookLogin = document.getElementById("facebookLogin");

if (googleLogin) {
    googleLogin.addEventListener("click", function() {
        window.location.href = "../than/than.html";
    });
}

if (facebookLogin) {
    facebookLogin.addEventListener("click", function() {
        window.location.href = "../than/than.html";
    });
}


