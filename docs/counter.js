// Universal Visit Counter using Google Sheets as Backend
class GoogleSheetsCounter {
    constructor() {
        // Replace this URL with your actual Google Apps Script web app URL
        this.apiUrl = 'https://script.google.com/macros/s/AKfycbzuQBrzNVoDljGN46v0RJvYh-I_7js6Cka8qEikXtAys7y-whzay7tjLuC2urvzG2uC/exec';
        this.counterElement = document.querySelector('.visit-counter');
        this.sessionStorageKey = 'inhaleExhale_visitCounted';
        this.countStorageKey = 'inhaleExhale_currentCount';
        this.init();
    }

    async init() {
        try {
            // Check if user has already been counted in this session
            const hasBeenCounted = sessionStorage.getItem(this.sessionStorageKey) === 'true';
            
            if (hasBeenCounted) {
                // User already counted, just display the stored count
                const storedCount = sessionStorage.getItem(this.countStorageKey);
                if (storedCount) {
                    this.displayCount(parseInt(storedCount, 10));
                } else {
                    // Fallback: fetch count without incrementing (this will increment, but it's a fallback)
                    await this.incrementAndGetCount();
                }
            } else {
                // First visit in this session - increment the counter
                await this.incrementAndGetCount();
                // Mark as counted for this session
                sessionStorage.setItem(this.sessionStorageKey, 'true');
            }
        } catch (error) {
            console.error('Counter error:', error);
            this.showFallback();
        }
    }

    async incrementAndGetCount() {
        const response = await fetch(this.apiUrl, {
            method: 'GET',
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Store the count in sessionStorage so we can display it on other pages
        sessionStorage.setItem(this.countStorageKey, data.count.toString());
        this.displayCount(data.count);
    }

    displayCount(count) {
        if (this.counterElement) {
            this.counterElement.innerHTML = `
                <span class="counter-number">${count.toLocaleString()}</span>
                <span class="counter-label">visits</span>
            `;
        }
    }

    showFallback() {
        if (this.counterElement) {
            this.counterElement.innerHTML = `
                <span class="counter-number">∞</span>
                <span class="counter-label">visits</span>
            `;
        }
    }
}

// Initialize counter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GoogleSheetsCounter();
});
