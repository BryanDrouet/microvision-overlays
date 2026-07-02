/**
 * Script pour la page d'affichage de couleur
 * Gère l'extraction du code couleur depuis les paramètres d'URL
 * et l'affichage du fond coloré
 */

class ColorDisplay {
    constructor() {
        this.colorDisplay = document.getElementById('color-display');
        this.colorCode = document.getElementById('color-code');
        this.init();
    }

    init() {
        // Récupérer le paramètre 'color' de l'URL
        const params = new URLSearchParams(window.location.search);
        const colorParam = params.get('color');

        if (colorParam && this.isValidHexColor(colorParam)) {
            this.setColor(colorParam);
        } else {
            // Couleur par défaut (gris)
            this.setColor('808080');
            if (colorParam) {
                console.warn(`Paramètre de couleur invalide: "${colorParam}". Utilisation de la couleur par défaut.`);
            }
        }
    }

    /**
     * Vérifie si une chaîne est un code couleur hexadécimal valide
     * @param {string} hex - Code couleur à valider
     * @returns {boolean} True si valide, false sinon
     */
    isValidHexColor(hex) {
        // Supprimer le # s'il est présent
        hex = hex.replace('#', '');
        
        // Vérifier si c'est 3 ou 6 caractères hexadécimaux
        return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex);
    }

    /**
     * Normalise un code couleur hexadécimal
     * Convertit #RGB en #RRGGBB
     * @param {string} hex - Code à normaliser
     * @returns {string} Code hexadécimal normalisé avec #
     */
    normalizeHex(hex) {
        hex = hex.replace('#', '').toUpperCase();
        
        // Convertir 3 digits en 6 digits
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        
        return '#' + hex;
    }

    /**
     * Détermine si le texte doit être clair (blanc) ou foncé (noir)
     * basé sur la luminosité de la couleur
     * @param {string} hex - Code couleur hexadécimal
     * @returns {boolean} True pour le mode clair (texte noir), false pour le mode sombre (texte blanc)
     */
    isLightColor(hex) {
        hex = hex.replace('#', '');
        
        // Convertir 3 digits en 6 digits
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Formule de luminance relative (WCAG)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        return luminance > 0.5;
    }

    /**
     * Applique la couleur au fond et affiche le code
     * @param {string} hex - Code couleur hexadécimal
     */
    setColor(hex) {
        const normalizedHex = this.normalizeHex(hex);
        
        // Appliquer la couleur au fond
        this.colorDisplay.style.backgroundColor = normalizedHex;
        
        // Afficher le code couleur
        this.colorCode.textContent = normalizedHex;
        
        // Déterminer si le texte doit être clair ou foncé
        if (this.isLightColor(normalizedHex)) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }
    }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new ColorDisplay();
});
