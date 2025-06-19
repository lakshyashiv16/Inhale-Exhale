fetch('/data/quotes.json')
  .then(res => res.json())
  .then(data => {
    const quote = data[Math.floor(Math.random() * data.length)];
    document.getElementById('quote-box').innerText = quote;
});

fetch('/data/mantras.json')
  .then(res => res.json())
  .then(data => {
    const mantra = data[Math.floor(Math.random() * data.length)];
    document.getElementById('mantra').innerText = mantra;
});
