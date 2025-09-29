const gridItems = document.querySelectorAll(".grid__img");

let scrollTriggered = false;

// بررسی اسکرول
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  gridItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;

    // اگر تصویر وارد صفحه شد و هنوز دیده نشده
    if (itemTop < windowHeight && !item.classList.contains("visible")) {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 150); // تاخیر برای ظاهر شدن یکی یکی
    }
  });

  // اگر همه تصاویر دیده شدند و دوباره اسکرول بالا رفت
  const allVisible = Array.from(gridItems).every(item => item.classList.contains("visible"));
  if (allVisible && scrollY < 50 && !scrollTriggered) {
    scrollTriggered = true;
    gridItems.forEach(item => item.classList.remove("visible"));
    setTimeout(() => { scrollTriggered = false; }, 200); // جلوگیری از loop
  }
});
