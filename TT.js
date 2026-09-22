/* ============================================================
   XỬ LÝ TRANG MUA HÀNG (bản cơ bản)
   1. Đọc tham số trên URL
   2. Hiển thị sản phẩm: THÔNG TIN bên trái + ẢNH bên phải
   3. Nút MUA HÀNG nằm dưới cả 2 cột
   4. Bấm MUA HÀNG -> hiện form đặt hàng
   5. Bấm XÁC NHẬN -> thông báo đặt hàng thành công
   ============================================================ */

// ------------------------------------------------------------
// 1. ĐỌC THAM SỐ TRÊN URL
// ------------------------------------------------------------
// Ví dụ URL:
// TT.html?product=Áo%20thun&price=199000&color=Trắng,Đen&size=M,L&image=../images/ao-thun.jpg
// ------------------------------------------------------------
var chuoiThamSo = window.location.search;
var thamSo      = new URLSearchParams(chuoiThamSo);

var tenSanPham  = thamSo.get("product");
var giaSanPham  = thamSo.get("price");
var mauSanPham  = thamSo.get("color");
var sizeSanPham = thamSo.get("size");
var anhSanPham  = thamSo.get("image");   // Ảnh sản phẩm

// ------------------------------------------------------------
// 2. LẤY CÁC PHẦN TỬ HTML CẦN DÙNG
// ------------------------------------------------------------
var khoiSanPham = document.getElementById("selected-product");
var khoiDatHang = document.getElementById("order-section");
var formDatHang = document.getElementById("order-form");
var oChonMau    = document.getElementById("color");
var oChonSize   = document.getElementById("size");

// ------------------------------------------------------------
// 3. HÀM ĐỊNH DẠNG GIÁ (199000 -> 199.000 VNĐ)
// ------------------------------------------------------------
function dinhDangGia(gia) {
    var so = Number(gia);

    if (isNaN(so)) {
        return gia;
    }

    return so.toLocaleString("vi-VN") + " VNĐ";
}

// ------------------------------------------------------------
// 4. HÀM ĐỔ CÁC LỰA CHỌN VÀO <select>
// ------------------------------------------------------------
function doVaoSelect(oSelect, chuoiGiaTri) {
    var danhSach = chuoiGiaTri.split(",");

    for (var i = 0; i < danhSach.length; i++) {
        var giaTri = danhSach[i].trim();

        var opt = document.createElement("option");
        opt.value = giaTri;
        opt.textContent = giaTri;

        oSelect.appendChild(opt);
    }
}

// ------------------------------------------------------------
// 5. HIỂN THỊ SẢN PHẨM LÊN TRANG (2 CỘT)
// ------------------------------------------------------------
function hienThiSanPham() {

    // Nếu URL không có tham số "product"
    if (!tenSanPham) {
        khoiSanPham.innerHTML =
            "<h2>Chưa chọn sản phẩm</h2>" +
            "<p>Vui lòng quay lại trang " +
            "<a href='../than/than.html'>Sản phẩm</a> " +
            "và bấm “Xem sản phẩm”.</p>";
        return;
    }

    // ----- Tiêu đề -----
    var h2 = document.createElement("h2");
    h2.textContent = "Sản phẩm bạn đã chọn";
    khoiSanPham.appendChild(h2);

    // ----- Khung bài viết -----
    var article = document.createElement("article");

    // ----- Khung 2 cột -----
    var khung2Cot = document.createElement("div");
    khung2Cot.className = "sp-2cot";

    // ============ CỘT TRÁI: THÔNG TIN ============
    var cotThongTin = document.createElement("div");
    cotThongTin.className = "sp-thongtin";

    // Tên sản phẩm
    var h3 = document.createElement("h3");
    h3.textContent = tenSanPham;
    cotThongTin.appendChild(h3);

    // Giá
    var pGia = document.createElement("p");
    pGia.className = "gia";
    pGia.textContent = "Giá: " + dinhDangGia(giaSanPham);
    cotThongTin.appendChild(pGia);

    // Màu sắc
    if (mauSanPham) {
        var pMau = document.createElement("p");
        pMau.textContent = "Màu sắc: " + mauSanPham.split(",").join(", ");
        cotThongTin.appendChild(pMau);
    }

    // Kích thước
    if (sizeSanPham) {
        var pSize = document.createElement("p");
        pSize.textContent = "Kích thước: " + sizeSanPham.split(",").join(", ");
        cotThongTin.appendChild(pSize);
    }

    // ============ CỘT PHẢI: ẢNH ============
    var cotAnh = document.createElement("div");
    cotAnh.className = "sp-anh";

    if (anhSanPham) {
        var img = document.createElement("img");
        img.src = anhSanPham;
        img.alt = tenSanPham;

        // Nếu ảnh bị lỗi thì ẩn khung ảnh
        img.onerror = function () {
            cotAnh.className = "sp-anh khong-co-anh";
        };

        cotAnh.appendChild(img);
    } else {
        // Không có ảnh trên URL -> ẩn khung ảnh
        cotAnh.className = "sp-anh khong-co-anh";
    }

    // ============ GHÉP 2 CỘT VÀO KHUNG ============
    khung2Cot.appendChild(cotThongTin);
    khung2Cot.appendChild(cotAnh);

    article.appendChild(khung2Cot);
    khoiSanPham.appendChild(article);

    // ============ NÚT MUA HÀNG (NẰM DƯỚI 2 CỘT) ============
    var nutMua = document.createElement("button");
    nutMua.type = "button";
    nutMua.className = "nut-mua";
    nutMua.textContent = "MUA HÀNG";
    khoiSanPham.appendChild(nutMua);

    // ============ ĐỔ MÀU / SIZE VÀO <select> ============
    if (mauSanPham) {
        doVaoSelect(oChonMau, mauSanPham);
    }

    if (sizeSanPham) {
        doVaoSelect(oChonSize, sizeSanPham);
    }

    // ============ BẤM MUA HÀNG -> HIỆN FORM ============
    nutMua.onclick = function () {
        khoiDatHang.hidden = false;
        khoiDatHang.scrollIntoView({ behavior: "smooth", block: "start" });
    };
}

// ------------------------------------------------------------
// 6. XỬ LÝ KHI BẤM "XÁC NHẬN ĐẶT HÀNG"
// ------------------------------------------------------------
function xuLyDatHang(e) {
    e.preventDefault();

    if (!tenSanPham) {
        alert("Bạn chưa chọn sản phẩm!");
        return;
    }

    var hoTen     = document.getElementById("fullname").value.trim();
    var dienThoai = document.getElementById("phone").value.trim();
    var diaChi    = document.getElementById("address").value.trim();
    var mau       = oChonMau.value;
    var size      = oChonSize.value;
    var soLuong   = document.getElementById("quantity").value;
    var thanhToan = document.getElementById("payment").value;

    // Kiểm tra dữ liệu
    if (!mau || !size) {
        alert("Vui lòng chọn màu sắc và kích thước.");
        return;
    }

    if (!hoTen || !dienThoai || !diaChi) {
        alert("Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ.");
        return;
    }

    // Đổi giá trị thanh toán thành chữ dễ hiểu
    var chuThanhToan = "Thanh toán khi nhận hàng";
    if (thanhToan === "bank") {
        chuThanhToan = "Chuyển khoản";
    }

    // Thông báo thành công
    alert(
        "ĐẶT HÀNG THÀNH CÔNG!\n\n" +
        "Sản phẩm: " + tenSanPham + "\n" +
        "Màu: " + mau + "\n" +
        "Size: " + size + "\n" +
        "Số lượng: " + soLuong + "\n\n" +
        "Khách hàng: " + hoTen + "\n" +
        "SĐT: " + dienThoai + "\n" +
        "Địa chỉ: " + diaChi + "\n" +
        "Thanh toán: " + chuThanhToan
    );
}

// ------------------------------------------------------------
// 7. GẮN SỰ KIỆN & CHẠY
// ------------------------------------------------------------
formDatHang.onsubmit = xuLyDatHang;

hienThiSanPham();