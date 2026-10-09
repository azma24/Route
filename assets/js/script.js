// ----------------------------------------
// スクロールするとヘッダーが小さくなる
// ----------------------------------------

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 180) {
    header.classList.add("is-scroll");
  } else {
    header.classList.remove("is-scroll");
  }
});

// ----------------------------------------
// ハンバーガーメニュー
// ----------------------------------------

const headerElement = document.querySelector(".header");
const hamburger = document.getElementById("hamburgerBtn");

hamburger.addEventListener("click", () => {
  const isOpen = headerElement.classList.toggle("is-menu-open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

const navLinks = document.querySelectorAll(".header__nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    headerElement.classList.remove("is-menu-open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Escキーでメニューを閉じる
document.addEventListener("keydown", (event) => {
  console.log("押したキー:", event.key);

  if (
    event.key === "Escape" &&
    headerElement.classList.contains("is-menu-open")
  ) {
    headerElement.classList.remove("is-menu-open");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// ----------------------------------------
// モーダルウィンドウ
// ----------------------------------------

const openBtn = document.querySelector(".js-open");
const content = document.querySelector(".js-modal");
const closeBtns = document.querySelectorAll(".js-close");

openBtn.addEventListener("click", () => {
  content.classList.add("is-open");
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    content.classList.remove("is-open");
  });
});

// ----------------------------------------
// FAQのアコーディオン
// ----------------------------------------

const faqQuestions = document.querySelectorAll(".faq__question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const isOpen = question.classList.contains("is-open");

    // すべて閉じる
    faqQuestions.forEach((item) => {
      item.classList.remove("is-open");
      item.nextElementSibling.classList.remove("is-open");
    });

    // クリックした項目が閉じていた場合だけ開く
    if (!isOpen) {
      question.classList.add("is-open");
      question.nextElementSibling.classList.add("is-open");
    }
  });
});

// ----------------------------------------
// 要素をふわっと表示
// ----------------------------------------

const targets = document.querySelectorAll(".scroll-js");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

targets.forEach((target) => {
  observer.observe(target);
});
