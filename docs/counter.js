// Universal Visit Counter with Smart Fallbacks
class VisitCounter {
  constructor() {
    this.counterId = 'inhale-exhale-website';
    this.fallbackCount = 0;
    this.isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  }

  async increment() {
    try {
      // On localhost, use localStorage for immediate testing
      if (this.isLocalhost) {
        console.log('Localhost detected, using localStorage counter');
        const current = this.getLocalCount();
        const next = current + 1;
        this.setLocalCount(next);
        return next;
      }

      // On production, try CountAPI first
      console.log('Production detected, trying CountAPI...');
      
      try {
        const response = await fetch(`https://api.countapi.xyz/hit/${this.counterId}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('CountAPI increment result:', data);
          
          // Store the result locally as backup
          this.setLocalCount(data.value);
          return data.value;
        } else {
          throw new Error('CountAPI response not ok');
        }
      } catch (apiError) {
        console.log('CountAPI failed, using localStorage fallback');
        
        // Fallback to localStorage
        const current = this.getLocalCount();
        const next = current + 1;
        this.setLocalCount(next);
        return next;
      }
    } catch (error) {
      console.error('Counter increment error:', error);
      // Final fallback
      const current = this.getLocalCount();
      const next = current + 1;
      this.setLocalCount(next);
      return next;
    }
  }

  getLocalCount() {
    try {
      return parseInt(localStorage.getItem('inhale_exhale_visit_count') || '0');
    } catch (error) {
      return this.fallbackCount;
    }
  }

  setLocalCount(count) {
    try {
      localStorage.setItem('inhale_exhale_visit_count', count.toString());
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  formatCount(count) {
    return count.toLocaleString();
  }

  async display() {
    try {
      const visitCounterContainer = document.querySelector('.visit-counter');
      const visitCounterImg = document.getElementById('visit-counter');
      
      if (visitCounterContainer) {
        // Hide the image
        if (visitCounterImg) {
          visitCounterImg.style.display = 'none';
        }
        
        // Show loading
        visitCounterContainer.innerHTML = `
          <span>Loading visits...</span>
        `;
        
        // Get the count
        const count = await this.increment();
        
        // Update display
        if (this.isLocalhost) {
          visitCounterContainer.innerHTML = `
            <span>Total Visits (dev): ${this.formatCount(count)}</span>
          `;
        } else {
          visitCounterContainer.innerHTML = `
            <span>Total Visits: ${this.formatCount(count)}</span>
          `;
        }
      }
    } catch (error) {
      console.error('Display error:', error);
      // Show fallback count
      const fallbackCount = this.getLocalCount();
      const visitCounterContainer = document.querySelector('.visit-counter');
      if (visitCounterContainer) {
        visitCounterContainer.innerHTML = `
          <span>Total Visits: ${this.formatCount(fallbackCount)}</span>
        `;
      }
    }
  }
}

// Initialize counter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing smart counter...');
  console.log('Hostname:', location.hostname);
  console.log('Is localhost:', ['localhost', '127.0.0.1', '::1'].includes(location.hostname));
  
  const counter = new VisitCounter();
  counter.display();
});
