let appliedFormats = [];
const totalFormats = 5;
let draggedElement = null;

const formatItems = document.querySelectorAll(".format-item");
const dropZone = document.getElementById("dropZone");
const textContent = document.getElementById("textContent");
const progressFill = document.getElementById("progressFill");
const comparisonArea = document.getElementById("comparisonArea");
const successMessage = document.getElementById("successMessage");
const formattedText = document.getElementById("formattedText");

// Drag and drop functionality
formatItems.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    if (item.classList.contains("used")) {
      e.preventDefault();
      return;
    }
    draggedElement = item;
    e.dataTransfer.effectAllowed = "move";
  });
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");

  if (draggedElement && !draggedElement.classList.contains("used")) {
    const format = draggedElement.dataset.format;
    applyFormat(format);
    draggedElement.classList.add("used");
    showEffect(format);
    updateProgress();
    draggedElement = null;
  }
});

function applyFormat(format) {
  appliedFormats.push(format);

  switch (format) {
    case "bold":
      textContent.style.fontWeight = "bold";
      break;
    case "italic":
      textContent.style.fontStyle = "italic";
      break;
    case "underline":
      textContent.style.textDecoration = "underline";
      break;
    case "color":
      textContent.style.color = "#e74c3c";
      break;
    case "size":
      textContent.style.fontSize = "1.3rem";
      break;
  }

  updateFormattedText();
}

function updateFormattedText() {
  let styles = "";

  if (appliedFormats.includes("bold")) styles += "font-weight: bold; ";
  if (appliedFormats.includes("italic")) styles += "font-style: italic; ";
  if (appliedFormats.includes("underline"))
    styles += "text-decoration: underline; ";
  if (appliedFormats.includes("color")) styles += "color: #e74c3c; ";
  if (appliedFormats.includes("size")) styles += "font-size: 1.3rem; ";

  formattedText.innerHTML = `<div style="${styles}">Công nghệ thông tin đã trở thành một phần không thể thiếu trong cuộc sống hiện đại. Từ việc học tập, làm việc đến giải trí, chúng ta đều sử dụng các thiết bị và ứng dụng công nghệ mỗi ngày. Việc hiểu và sử dụng thành thạo công nghệ thông tin sẽ giúp chúng ta thành công hơn trong tương lai.</div>`;
}

function showEffect(format) {
  const effect = document.createElement("div");
  effect.className = "format-effect";

  const formatNames = {
    bold: "In đậm!",
    italic: "In nghiêng!",
    underline: "Gạch chân!",
    color: "Đổi màu!",
    size: "Tăng cỡ chữ!",
  };

  effect.textContent = formatNames[format];
  dropZone.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 1000);
}

function updateProgress() {
  const progress = (appliedFormats.length / totalFormats) * 100;
  progressFill.style.width = progress + "%";

  if (appliedFormats.length === totalFormats) {
    setTimeout(() => {
      comparisonArea.classList.add("show");
      successMessage.classList.add("show");
    }, 500);
  }
}

// Touch support for mobile devices
formatItems.forEach((item) => {
  let touchStartY = 0;
  let touchStartX = 0;

  item.addEventListener("touchstart", (e) => {
    if (item.classList.contains("used")) return;

    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    item.style.transform = "scale(1.1)";
    item.style.zIndex = "1000";
  });

  item.addEventListener("touchmove", (e) => {
    if (item.classList.contains("used")) return;

    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    item.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
  });

  item.addEventListener("touchend", (e) => {
    if (item.classList.contains("used")) return;

    const touch = e.changedTouches[0];
    const dropRect = dropZone.getBoundingClientRect();

    if (
      touch.clientX >= dropRect.left &&
      touch.clientX <= dropRect.right &&
      touch.clientY >= dropRect.top &&
      touch.clientY <= dropRect.bottom
    ) {
      const format = item.dataset.format;
      applyFormat(format);
      item.classList.add("used");
      showEffect(format);
      updateProgress();
    }

    item.style.transform = "";
    item.style.zIndex = "";
  });
});
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'97d8025792cd04c8',t:'MTc1NzYwMjU1OS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

// === Nút Làm mới ===
const resetBtn = document.getElementById("resetBtn");
const originalTextContent = textContent.textContent; // lưu văn bản gốc

resetBtn.addEventListener("click", () => {
  // Xóa các format đã áp dụng
  appliedFormats = [];
  textContent.style.fontWeight = "";
  textContent.style.fontStyle = "";
  textContent.style.textDecoration = "";
  textContent.style.color = "";
  textContent.style.fontSize = "";

  // Khôi phục nội dung vùng formattedText về mặc định
  formattedText.innerHTML = originalTextContent;

  // Đặt lại thanh tiến trình
  progressFill.style.width = "0%";

  // Ẩn khu so sánh và message
  comparisonArea.classList.remove("show");
  successMessage.classList.remove("show");

  // Cho phép kéo thả lại (gỡ class used)
  document.querySelectorAll(".format-item.used").forEach((item) => {
    item.classList.remove("used");
  });
});
