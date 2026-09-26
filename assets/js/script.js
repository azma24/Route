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
