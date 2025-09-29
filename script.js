const gridItems = document.querySelectorAll(".grid__img");

let mouseX = 0, mouseY = 0;
let scrollY = window.scrollY;

// حرکت موس
document.addEventListener("mousemove", e => {
  mouseX = (window.innerWidth / 2 - e.pageX) / 50;
  mouseY = (window.innerHeight / 2 - e.pageY) / 50;
});

// افکت ورود تصاویر با Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // فقط یکبار نمایش
    }
  });
}, { threshold: 0.3 });

gridItems.forEach(item => observer.observe(item));

// افکت Parallax بعد از ورود
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// اجرای انیمیشن با requestAnimationFrame
function animate() {
  gridItems.forEach((item, index) => {
    if (item.classList.contains("visible")) {
      const parallax = scrollY * (index + 1) / 150;
      item.style.transform = `translateY(${parallax}px) rotateY(${mouseX}deg) rotateX(${mouseY}deg)`;
    }
  });
  requestAnimationFrame(animate);
}

animate();
