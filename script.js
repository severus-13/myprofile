document.getElementById('year').textContent = new Date().getFullYear();

const profileInput = document.getElementById('profileImageInput');
const profilePreview = document.getElementById('profilePreview');
const revealItems = document.querySelectorAll('.reveal');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (profileInput && profilePreview) {
  profileInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profilePreview.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

const revealOnScroll = () => {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 70) {
      item.classList.add('is-visible');
    }
  });
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';

    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    portfolioCards.forEach((card) => {
      const isMatch = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !isMatch);
    });
  });
});

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);
