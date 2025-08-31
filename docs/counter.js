// Universal Visit Counter using Google Sheets as Backend
class GoogleSheetsCounter {
    constructor() {
        // Replace this URL with your actual Google Apps Script web app URL
        this.apiUrl = 'https://script.google.com/macros/s/AKfycbzuQBrzNVoDljGN46v0RJvYh-I_7js6Cka8qEikXtAys7y-whzay7tjLuC2urvzG2uC/exec';
        this.counterElement = document.querySelector('.visit-counter');
        this.init();
    }

    async init() {
        try {
            await this.incrementAndGetCount();
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
