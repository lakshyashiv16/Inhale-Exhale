// Universal Visit Counter for GitHub Pages
class VisitCounter {
  constructor() {
    this.counterId = 'inhale-exhale-website'; // Unique identifier for your site
    this.countApiUrl = 'https://api.countapi.xyz';
    this.fallbackCount = 0;
  }

  async increment() {
    try {
      // Use CountAPI to get and increment the universal counter
      const response = await fetch(`${this.countApiUrl}/hit/${this.counterId}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.value; // This is the new count after incrementing
      } else {
        throw new Error('Failed to fetch from CountAPI');
      }
    } catch (error) {
      console.error('CountAPI error:', error);
      // Fallback to localStorage if API fails
      return this.getLocalFallback();
    }
  }

  async getCurrentCount() {
    try {
      // Get current count without incrementing
      const response = await fetch(`${this.countApiUrl}/get/${this.counterId}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.value;
      } else {
        throw new Error('Failed to get count from CountAPI');
      }
    } catch (error) {
      console.error('CountAPI get error:', error);
      return this.getLocalFallback();
    }
  }

  getLocalFallback() {
    try {
      return parseInt(localStorage.getItem('inhale_exhale_fallback_count') || '0');
    } catch (error) {
      return this.fallbackCount;
    }
  }

  setLocalFallback(count) {
    try {
      localStorage.setItem('inhale_exhale_fallback_count', count.toString());
    } catch (error) {
      console.error('Failed to save fallback count:', error);
    }
  }

  formatCount(count) {
    return count.toLocaleString();
  }

  async display() {
    try {
      // Show loading state
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
        
        // Get and increment the universal counter
        const count = await this.increment();
        
        // Update display with real count
        visitCounterContainer.innerHTML = `
          <span>Total Visits: ${this.formatCount(count)}</span>
        `;
        
        // Store fallback count
        this.setLocalFallback(count);
      }
    } catch (error) {
      console.error('Display error:', error);
      // Show fallback count
      const fallbackCount = this.getLocalFallback();
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
  const counter = new VisitCounter();
  counter.display();
});
