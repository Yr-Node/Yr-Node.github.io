// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const group = el.closest('.project-grid, .skill-groups, .badges, .exp-domain-grid');
        let delay = 0;

        if (group) {
          const siblings = Array.from(group.children).filter((c) => c.classList.contains('reveal') || c.classList.contains('card') || c.classList.contains('skill-group') || c.classList.contains('exp-card'));
          delay = siblings.indexOf(el) * 80;
        }

        el.style.transitionDelay = `${Math.min(delay, 320)}ms`;
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const projectGrid = document.querySelector('.project-grid');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    if (projectGrid) {
      projectGrid.classList.remove('filter-team', 'filter-individual');
      if (filter === 'team') projectGrid.classList.add('filter-team');
      if (filter === 'individual') projectGrid.classList.add('filter-individual');
    }
  });
});
