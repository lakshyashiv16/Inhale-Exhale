document.addEventListener('DOMContentLoaded', () => {
  // Rotating quote logic
  let quotes = [];
  let quoteIdx = 0;
  const quoteEl = document.getElementById('rotating-quote');

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

  // Mantra of the Week logic
  fetch('mantras.json')
    .then(res => res.json())
    .then(data => {
      const week = getWeekNumber(new Date());
      const mantra = data[week % data.length];
      document.getElementById('mantra-of-the-week').textContent = mantra;
    })
    .catch(() => {
      document.getElementById('mantra-of-the-week').textContent = 'You are enough.';
    });
});

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return weekNo;
} 