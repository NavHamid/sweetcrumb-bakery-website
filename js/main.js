// Configuration
const ITEMS_PER_PAGE = 3;
const MOBILE_BREAKPOINT = 768;

// State
const appState = {
  currentPage: 0,
  showMobileMore: false,
};

// DOM
const navMenu = document.getElementById('navcol-1');
const navToggler = document.querySelector('.navbar-toggler');
const navLinks = document.querySelectorAll('#navcol-1 .nav-link');
const viewMoreBtn = document.getElementById('viewMoreBtn');
const galleryItems = document.querySelectorAll('.gallery-extra');
const prevBtn = document.getElementById('reviewPrevBtn');
const nextBtn = document.getElementById('reviewNextBtn');
const moreBtn = document.getElementById('reviewMoreBtn');
const reviews = document.querySelectorAll('.testimonial-item');
const prefersReducedMotion = matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Set active nav link
function setActiveNav(hash) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}

// Collapse navbar
function closeNav() {
  if (!navMenu || !navToggler || typeof bootstrap === 'undefined') return;
  if (
    getComputedStyle(navToggler).display !== 'none' &&
    navMenu.classList.contains('show')
  ) {
    bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
  }
}

// Toggle gallery expand/collapse
function toggleGallery() {
  if (!viewMoreBtn || galleryItems.length === 0) return;
  const isExpanded = galleryItems[0].classList.contains('gallery-revealed');
  galleryItems.forEach(item =>
    item.classList.toggle('gallery-revealed', !isExpanded)
  );
  viewMoreBtn.innerHTML = isExpanded
    ? '<i class="fa fa-chevron-down me-2"></i>View More'
    : '<i class="fa fa-chevron-up me-2"></i>Show Less';
}

// Render reviews based on page or mobile
function renderReviews() {
  if (reviews.length === 0) return;
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  if (!isMobile) appState.showMobileMore = false;

  reviews.forEach((review, idx) => {
    let show = false;
    if (isMobile) {
      show = appState.showMobileMore || idx < ITEMS_PER_PAGE;
    } else {
      const start = appState.currentPage * ITEMS_PER_PAGE;
      const end = (appState.currentPage + 1) * ITEMS_PER_PAGE;
      show = idx >= start && idx < end;
    }

    review.classList.toggle('testimonial-hidden', !show);
    if (show) {
      review.querySelectorAll('.review-observe').forEach(card => {
        card.classList.add('review-in-view');
      });
    }
  });

  if (moreBtn) {
    moreBtn.innerHTML = appState.showMobileMore
      ? '<i class="fa fa-angle-up me-2"></i>Show Fewer Reviews'
      : '<i class="fa fa-angle-down me-2"></i>See More Reviews';
  }

  if (prevBtn) prevBtn.disabled = isMobile || appState.currentPage === 0;
  if (nextBtn)
    nextBtn.disabled = isMobile || appState.currentPage >= totalPages - 1;
}

// Change review page
function changeReviewPage(direction) {
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const nextPage = appState.currentPage + direction;
  if (nextPage < 0 || nextPage >= totalPages) return;
  appState.currentPage = nextPage;
  renderReviews();
}

// Book cake animations
function initBookCakeAnimation() {
  const stage = document.querySelector('.book-cake-stage');
  const form = document.querySelector('.book-form-mock');
  const orbit = document.querySelector('.book-stage-orbit');
  const chips = document.querySelectorAll('.book-stage-chip');
  const points = document.querySelectorAll('.book-point');

  if (
    !stage ||
    !form ||
    chips.length === 0 ||
    prefersReducedMotion ||
    typeof gsap === 'undefined'
  )
    return;

  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger:
      typeof ScrollTrigger !== 'undefined'
        ? { trigger: '#book-cake', start: 'top 72%', once: true }
        : undefined,
  });

  timeline
    .from(points, { opacity: 0, x: -24, duration: 0.58, stagger: 0.09 })
    .from(form, { opacity: 0, y: 42, scale: 0.96, duration: 0.85 }, 0.12)
    .from(
      chips,
      { opacity: 0, y: 20, scale: 0.92, duration: 0.55, stagger: 0.1 },
      0.22
    );

  gsap.to(form, {
    y: '-=10',
    duration: 2.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  chips.forEach((chip, i) => {
    gsap.to(chip, {
      y: i === 1 ? -18 : -12,
      x: i === 0 ? 8 : i === 2 ? -8 : 0,
      rotation: i === 1 ? 2 : -2,
      duration: 3.2 + i * 0.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });

  if (orbit) {
    gsap.to(orbit, { rotation: 360, duration: 26, ease: 'none', repeat: -1 });
    gsap.to(orbit, {
      scale: 1.04,
      opacity: 0.82,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}

// Gallery favorite and cart buttons
document.addEventListener('click', function (event) {
  const favBtn = event.target.closest('.gallery-favorite-btn');
  const cartBtn = event.target.closest('.gallery-cart-btn');

  if (favBtn) {
    const icon = favBtn.querySelector('i');
    const active = favBtn.classList.toggle('is-active');
    if (icon) icon.className = active ? 'fa fa-heart' : 'fa fa-heart-o';
    return;
  }

  if (cartBtn) {
    const added = cartBtn.classList.toggle('is-added');
    cartBtn.innerHTML = added
      ? '<i class="fa fa-check" aria-hidden="true"></i>Added'
      : '<i class="fa fa-shopping-basket" aria-hidden="true"></i>Add to Cart';
  }
});

// Event listeners
if (viewMoreBtn) {
  viewMoreBtn.addEventListener('click', toggleGallery);
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => changeReviewPage(-1));
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => changeReviewPage(1));
}

if (moreBtn) {
  moreBtn.addEventListener('click', () => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      appState.showMobileMore = !appState.showMobileMore;
      renderReviews();
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const hash = link.getAttribute('href');
    if (hash?.startsWith('#')) setActiveNav(hash);
    closeNav();
  });
});

window.addEventListener('hashchange', () => {
  if (location.hash) setActiveNav(location.hash);
});

window.addEventListener('resize', renderReviews);

function initApp() {
  if (location.hash) setActiveNav(location.hash);
  renderReviews();
  initBookCakeAnimation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Lightbox config
if (typeof lightbox !== 'undefined') {
  lightbox.option({
    resizeDuration: 0,
    wrapAround: true,
    fadeDuration: 250,
    imageFadeDuration: 250,
  });
}
