// ==========================================================================
// Mihaly Charity Foundation — site interactions
// Vanilla JS only: mobile nav, animated impact counters, form feedback.
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  setFooterYear();
  setupMobileNav();
  setupCounters();
  setupContactForm();
  setupNewsletterForm();
});

/* ---- Footer year ---- */
function setFooterYear() {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---- Mobile nav toggle ---- */
function setupMobileNav() {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Animated impact counters, triggered when scrolled into view ---- */
function setupCounters() {
  var counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  var animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;

    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1500;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + (progress >= 1 ? suffix : '');
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }
      requestAnimationFrame(step);
    });
  }

  var impactSection = document.getElementById('impact');
  if (!impactSection) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(impactSection);
  } else {
    animateCounters();
  }
}

/* ---- Contact form (front-end only placeholder) ---- */
function setupContactForm() {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in all required fields before sending.';
      status.style.color = '#E0632B';
      return;
    }

    // Placeholder: no backend is connected yet. Wire this up to your
    // email service or form API of choice.
    status.textContent = 'Thank you — your message has been received. We will reply soon.';
    status.style.color = '#2C6B41';
    form.reset();
  });
}

/* ---- Newsletter signup (front-end only placeholder) ---- */
function setupNewsletterForm() {
  var form = document.getElementById('newsletter-form');
  var status = document.getElementById('newsletter-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = 'Thanks for subscribing! Watch your inbox for updates.';
    status.style.color = '#2C6B41';
    form.reset();
  });
}