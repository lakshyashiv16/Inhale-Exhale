// Visit Counter for GitHub Pages
class VisitCounter {
  constructor() {
    this.storageKey = 'inhale_exhale_visit_count';
    this.counterFile = 'counter.json';
    this.fallbackCount = 0;
  }

  async increment() {
    try {
      // Try to get count from localStorage first
      let count = this.getLocalCount();
      
      // Try to fetch from counter file (if it exists)
      try {
        const response = await fetch(this.counterFile);
        if (response.ok) {
          const data = await response.json();
          count = Math.max(count, data.count || 0);
        }
      } catch (error) {
        console.log('Counter file not accessible, using localStorage');
      }
      
      // Increment count
      count++;
      
      // Store locally
      this.setLocalCount(count);
      
      // Try to update counter file (this won't work on GitHub Pages but good for testing)
      this.updateCounterFile(count);
      
      return count;
    } catch (error) {
      console.error('Counter error:', error);
      return this.getLocalCount();
    }
  }

  getLocalCount() {
    try {
      return parseInt(localStorage.getItem(this.storageKey) || '0');
    } catch (error) {
      return this.fallbackCount;
    }
  }

  setLocalCount(count) {
    try {
      localStorage.setItem(this.storageKey, count.toString());
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  async updateCounterFile(count) {
    // This is a placeholder for when you have write access
    // On GitHub Pages, this won't work, but it's good for development
    try {
      const data = { count, lastUpdated: new Date().toISOString() };
      console.log('Counter updated:', data);
    } catch (error) {
      console.log('Counter file update not available on GitHub Pages');
    }
  }

  formatCount(count) {
    return count.toLocaleString();
  }

  async display() {
    const count = await this.increment();
    const visitCounterContainer = document.querySelector('.visit-counter');
    const visitCounterImg = document.getElementById('visit-counter');
    
    if (visitCounterContainer) {
      // Hide the image and show text counter
      if (visitCounterImg) {
        visitCounterImg.style.display = 'none';
      }
      
      visitCounterContainer.innerHTML = `
        <span>Total Visits: ${this.formatCount(count)}</span>
        <br>
        <small style="opacity: 0.7; font-size: 0.8rem;">Refreshing this page will increment the counter</small>
      `;
    }
  }
}

// Initialize counter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const counter = new VisitCounter();
  counter.display();
});
