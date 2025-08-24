document.addEventListener('DOMContentLoaded', () => {
  // Rotating quote logic
  const quoteEl = document.getElementById('rotating-quote');
  if (quoteEl) {
    let quotes = [];
    let quoteIdx = 0;
    fetch('quotes.json')
      .then(res => res.json())
      .then(data => {
        quotes = data;
        showQuote();
        setInterval(() => {
          fadeQuoteOut(() => {
            quoteIdx = (quoteIdx + 1) % quotes.length;
            showQuote();
          });
        }, 6000);
      })
      .catch(() => {
        quoteEl.textContent = 'Breathe in peace, breathe out stress.';
      });
    function showQuote() {
      quoteEl.textContent = quotes[quoteIdx];
      quoteEl.style.opacity = 1;
    }
    function fadeQuoteOut(cb) {
      quoteEl.style.opacity = 0;
      setTimeout(cb, 800);
    }
  }

  // Mantra of the Week logic
  const mantraEl = document.getElementById('mantra-of-the-week');
  if (mantraEl) {
    fetch('mantras.json')
      .then(res => res.json())
      .then(data => {
        const week = getWeekNumber(new Date());
        const mantra = data[week % data.length];
        mantraEl.textContent = mantra;
      })
      .catch(() => {
        mantraEl.textContent = 'You are enough.';
      });
  }

  // Scroll-to-top button logic
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fade-in animation for sections
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    if ('IntersectionObserver' in window) {
      const fadeObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      fadeEls.forEach(el => fadeObs.observe(el));
    } else {
      // Fallback: show all
      fadeEls.forEach(el => el.classList.add('visible'));
    }
  }

  // Visit counter logic
  const visitCounterImg = document.getElementById('visit-counter');
  if (visitCounterImg) {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(location.hostname);
    
    if (isLocalhost) {
      // Local development: show local counter
      const current = Number(localStorage.getItem('dev_visit_count') || '0');
      const next = current + 1;
      localStorage.setItem('dev_visit_count', String(next));
      visitCounterImg.style.display = 'none';
      const visitCounterContainer = document.querySelector('.visit-counter');
      if (visitCounterContainer) {
        visitCounterContainer.innerHTML = `<span>Visits (dev): ${next.toLocaleString()}</span>`;
      }
    } else {
      // Production: use the hits counter service
      const currentUrl = encodeURIComponent(window.location.href);
      visitCounterImg.src = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${currentUrl}&title=Visits`;
      visitCounterImg.style.display = 'inline';
    }
  }

  // Signup form handler
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const date_of_birth = document.getElementById('dob').value;
      const password = document.getElementById('password').value;
      const msgDiv = document.getElementById('signupMessage');
      msgDiv.textContent = '';
      try {
        const res = await fetch('http://localhost:8000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, date_of_birth, password })
        });
        const data = await res.json();
        if (res.ok) {
          msgDiv.style.color = 'green';
          msgDiv.textContent = 'Signup successful! You can now log in.';
          signupForm.reset();
        } else {
          msgDiv.style.color = 'red';
          msgDiv.textContent = data.error || 'Signup failed.';
        }
      } catch (err) {
        msgDiv.style.color = 'red';
        msgDiv.textContent = 'Network error.';
      }
    });
  }

  // Login form handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const msgDiv = document.getElementById('loginMessage');
      msgDiv.textContent = '';
      try {
        const res = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          msgDiv.style.color = 'green';
          msgDiv.textContent = 'Login successful!';
          // Optionally redirect or store user info here
        } else {
          msgDiv.style.color = 'red';
          msgDiv.textContent = data.error || 'Login failed.';
        }
      } catch (err) {
        msgDiv.style.color = 'red';
        msgDiv.textContent = 'Network error.';
      }
    });
  }
});

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return weekNo;
} 