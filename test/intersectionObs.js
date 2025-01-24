const snapItems = document.querySelectorAll('.snap-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(`Visible: ${entry.target.textContent}`);
    }
  });
}, {
  root: document.querySelector('.snap-container'),
  threshold: 1
});

snapItems.forEach(item => observer.observe(item));
