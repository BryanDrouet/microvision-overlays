/**
 * Script partagé pour tous les écrans de test
 * Gère : l'horloge, la date, la résolution d'écran
 */

class ScreenDisplay {
    constructor(screenName) {
        this.screenName = screenName;
        this.init();
    }

    init() {
        this.updateResolution();
        this.updateTime();
        
        // Mise à jour en temps réel
        setInterval(() => this.updateTime(), 1000);
        window.addEventListener('resize', () => this.updateResolution());
    }

    updateResolution() {
        const width = Math.round(window.innerWidth);
        const height = Math.round(window.innerHeight);
        const resolutionEl = document.getElementById('screen-resolution');
        
        if (resolutionEl) {
            resolutionEl.textContent = `${width} × ${height}`;
        }
    }

    updateTime() {
        const now = new Date();
        
        const timeEl = document.getElementById('current-time');
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        const dateEl = document.getElementById('current-date');
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString('fr-FR', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    const screenName = document.body.getAttribute('data-screen-name');
    if (screenName) {
        new ScreenDisplay(screenName);
    }
});
