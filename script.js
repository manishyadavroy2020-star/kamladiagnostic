// ===== Sticky Navbar =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu() {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  navOverlay.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', closeMenu);

navItems.forEach(item => {
  item.addEventListener('click', closeMenu);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

// ===== Scroll Animations =====
const fadeElements = document.querySelectorAll('.fade-up');
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);
fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Scroll to Top =====
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const test = document.getElementById('test');

    // Reset errors
    document.querySelectorAll('.error-text').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.form-group input, .form-group select').forEach(el => el.style.borderColor = 'var(--border)');

    if (!name.value.trim()) {
      showError(name, 'Please enter your name');
      valid = false;
    }

    if (!phone.value.trim() || !/^[0-9]{10}$/.test(phone.value.trim())) {
      showError(phone, 'Please enter a valid 10-digit phone number');
      valid = false;
    }

    if (!test.value) {
      showError(test, 'Please select a test');
      valid = false;
    }

    if (valid) {
      // Show success modal
      const modal = document.getElementById('successModal');
      modal.classList.add('active');
      contactForm.reset();
    }
  });
}

function showError(input, message) {
  input.style.borderColor = '#ef4444';
  const errorEl = input.parentElement.querySelector('.error-text');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

// ===== Booking Modal =====
const bookingBtns = document.querySelectorAll('[data-booking]');
const bookingModal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const modalCloses = document.querySelectorAll('.modal-close');

bookingBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    bookingModal.classList.add('active');
  });
});

modalCloses.forEach(btn => {
  btn.addEventListener('click', () => {
    bookingModal.classList.remove('active');
    successModal.classList.remove('active');
  });
});

[bookingModal, successModal].forEach(modal => {
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
});

// ===== Booking Form =====
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const bName = document.getElementById('bName');
    const bPhone = document.getElementById('bPhone');
    const bTest = document.getElementById('bTest');

    document.querySelectorAll('#bookingForm .error-text').forEach(el => el.style.display = 'none');

    if (!bName.value.trim()) { showError(bName, 'Please enter your name'); valid = false; }
    if (!bPhone.value.trim() || !/^[0-9]{10}$/.test(bPhone.value.trim())) { showError(bPhone, 'Enter valid 10-digit number'); valid = false; }
    if (!bTest.value) { showError(bTest, 'Please select a test'); valid = false; }

    if (valid) {
      bookingModal.classList.remove('active');
      successModal.classList.add('active');
      bookingForm.reset();
    }
  });
}

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix;
      }
    }
    update();
  });
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(statsSection);
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}
