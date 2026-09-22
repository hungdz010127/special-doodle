// JavaScript cơ bản cho trang thân

var slides = [
    {
        subTitle: "G&H CLOTHING",
        title: "STREETWEAR<br>STYLE",
        desc: "Simple. Cool. Different.",
        button: "Xem sản phẩm →"
    },
    {
        subTitle: "G&H CLOTHING",
        title: "URBAN<br>FASHION",
        desc: "Modern. Simple. Stylish.",
        button: "Khám phá ngay →"
    },
    {
        subTitle: "G&H CLOTHING",
        title: "NEW<br>COLLECTION",
        desc: "Be Simple. Be Cool.",
        button: "Xem bộ sưu tập →"
    }
];

var currentSlide = 0;
var heroSubTitle = document.getElementById("heroSubTitle");
var heroTitle = document.getElementById("heroTitle");
var heroDesc = document.getElementById("heroDesc");
var heroButton = document.getElementById("heroButton");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var dots = document.querySelectorAll(".dot");

function showSlide(index) {
    currentSlide = index;
    heroSubTitle.textContent = slides[index].subTitle;
    heroTitle.innerHTML = slides[index].title;
    heroDesc.textContent = slides[index].desc;
    heroButton.textContent = slides[index].button;

    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    dots[index].classList.add("active");
}

nextBtn.addEventListener("click", function() {
    currentSlide = currentSlide + 1;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
});

prevBtn.addEventListener("click", function() {
    currentSlide = currentSlide - 1;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
});

for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
        var number = Number(this.dataset.slide);
        showSlide(number);
    });
}

// ĐÃ SỬA: Gửi tên và giá sản phẩm sang trang shopping.
function muaHang(tenSanPham, giaSanPham) {
    window.location.href = "../shopping/TT.html?product=" +
        encodeURIComponent(tenSanPham) +
        "&price=" +
        encodeURIComponent(giaSanPham);
}
