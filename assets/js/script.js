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
    threshold: 0,
    rootMargin: "0px 0px -15% 0px",
  },
);

targets.forEach((target) => {
  observer.observe(target);
});

// ----------------------------------------
// Swiper
// ----------------------------------------

// スマホ版のみSwiperを有効にする
const initMobileSwiper = (slider) => {
  let swiper = null;
  const mediaQuery = window.matchMedia("(max-width: 480px)");

  const updateSwiper = () => {
    if (mediaQuery.matches && !swiper) {
      swiper = new Swiper(slider, {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        loop: true,
        speed: 600,

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    } else if (!mediaQuery.matches && swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  };

  updateSwiper();
  mediaQuery.addEventListener("change", updateSwiper);
};

// teacher：スマホ版のみスライダー
document.querySelectorAll(".js-mobile-swiper").forEach((slider) => {
  initMobileSwiper(slider);
});

// future：PC・スマホ共通で連続して流す
document.querySelectorAll(".js-continuous-swiper").forEach((slider) => {
  const wrapper = slider.querySelector(".swiper-wrapper");
  const originals = Array.from(wrapper.children);

  // 元の3枚を2回ぶん複製して合計9枚にする（ループ用）
  for (let i = 0; i < 2; i++) {
    originals.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      wrapper.appendChild(clone);
    });
  }

  new Swiper(slider, {
    slidesPerView: "auto",
    centeredSlides: true, // アクティブな円を中央に止める
    spaceBetween: 80,
    loop: true,
    speed: 1200, // 移動にかける時間
    allowTouchMove: true,

    autoplay: {
      delay: 6000, // 中央で止まっている時間
      disableOnInteraction: false,
    },
  });
});
