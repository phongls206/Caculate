console.log("KOMODO CACULATOR DEMO");
//  setInterval(() => {
// }, interval);  bao gio hoc bat dong bo ok se quay lai ap dung
// h chi biet dung moi settimeout
// setInterval() là gì?
// Hàm dùng để lặp lại một đoạn mã sau mỗi khoảng thời gian cố định.
// setInterval(hàm, thời_gian);
// 👉 Dùng khi cần: đồng hồ, xoá liên tục, cập nhật trạng thái... Nếu muốn kiểm soát tốt hơn, dùng setTimeout() tự gọi lại.
// Lặp liên tục cho đến khi bị dừng bằng clearInterval().

setTimeout(() => {
  alert("Đây là bản demo");
}, 5000);
setTimeout(() => {
  alert("Sau này sẽ nâng cấp thêm tính năng");
}, 8000);

const display = document.getElementById("caculator-display");
const btn = document.querySelectorAll(".caculator-icon");
const power = document.getElementById("power-btn");
const caculatorMain = document.querySelector(".caculator-main");
let data = "";
let countsyntax = 0;
let active = false;
let boot = false;
power.addEventListener("click", () => {
  if (boot) return;
  if (!active) {
    display.value = "Komodo is start...";
    boot = true;
    setTimeout(() => {
      display.value = "Power-On";
    }, 5000);
    setTimeout(() => {
      display.value = "0";
      active = true;
      boot = false;
      caculatorMain.classList.add("active");
    }, 6000);
  } else {
    display.value = "Power Off";
    active = false;
    caculatorMain.classList.remove("active");
    setTimeout(() => {
      display.value = "";
    }, 2000);
  }
});

btn.forEach((element) => {
  element.addEventListener("click", () => {
    if (!active) return;
    data = element.textContent;

    if (data === "x") {
      data = "";
      display.value += "*";
      return;
    }
    if (data === "()") {
      data = "";
      let lastChar = display.value.slice(-1);
      if (display.value.slice(0) === "0") {
        display.value = "(";
        countsyntax++;
        return;
      }
      if (countsyntax > 0 && /[0-9\)]/.test(lastChar)) {
        display.value += ")";
        countsyntax--;
      } else if (display.value === "" || /[0-9\%\)\+\-\*\/]/.test(lastChar)) {
        display.value += "(";
        countsyntax++;
      }
    }

    if (data === "÷") {
      data = "";
      display.value += "/";
      return;
    }
    if (data === "Del") {
      display.value = display.value.slice(0, -1);
    } else if (data === "AC") {
      display.value = "";
    } else if (data === "=") {
      if (display.value === "") {
      } else {
        try {
          display.value = math.evaluate(display.value);
        } catch {
          display.value = "Error";
          display.classList.add("error");
          setTimeout(() => {
            display.value = "";
            display.classList.remove("error");
          }, 1000);
        }
      }
    } else {
      if (display.value === "0") {
        display.value = data;
      } else {
        display.value += data;
      }
    }
    display.scrollLeft = display.scrollWidth;
    // Giai thich lenh nay
    // Trong DOM, mấy cái input hay div có thể cuộn ngang (scroll theo chiều X).

    // scrollWidth: là chiều rộng toàn bộ nội dung bên trong (kể cả phần bị tràn và bị ẩn).

    // scrollLeft: là vị trí cuộn hiện tại tính từ mép trái. Nếu nó bằng 0 → đang đứng ở đầu bên trái.
  });
});
