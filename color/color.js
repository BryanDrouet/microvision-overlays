/**
 * Script pour la page d'affichage de couleur
 * Gère l'extraction du code couleur depuis les paramètres d'URL
 * et l'affichage du fond coloré avec support des gradients
 */

class ColorDisplay {
    constructor() {
        this.colorDisplay = document.getElementById('color-display');
        this.init();
    }

    init() {
        // Récupérer les paramètres de l'URL
        const params = new URLSearchParams(window.location.search);
        const colorParam = params.get('color');
        const gradientParam = params.get('gradient');

        if (gradientParam) {
            // Mode gradient
            this.setGradient(gradientParam);
        } else if (colorParam && this.isValidHexColor(colorParam)) {
            // Mode couleur unie
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
     * Applique la couleur au fond
     * @param {string} hex - Code couleur hexadécimal
     */
    setColor(hex) {
        const normalizedHex = this.normalizeHex(hex);
        
        // Appliquer la couleur au fond
        this.colorDisplay.style.backgroundImage = 'none';
        this.colorDisplay.style.backgroundColor = normalizedHex;
    }

    /**
     * Applique un dégradé au fond
     * Format: "color1,color2" ou "color1,color2,angle"
     * @param {string} gradientParam - Paramètre de dégradé
     * Exemples: "FF0000,00FF00", "FF0000,00FF00,90", "FF0000,00FF00,45deg"
     */
    setGradient(gradientParam) {
        const parts = gradientParam.split(',').map(p => p.trim());
        
        if (parts.length < 2) {
            console.warn('Format de dégradé invalide. Utilisation de la couleur par défaut.');
            this.setColor('808080');
            return;
        }

        const color1 = parts[0];
        const color2 = parts[1];
        let angle = parts[2] || '45';

        // Valider les couleurs
        if (!this.isValidHexColor(color1) || !this.isValidHexColor(color2)) {
            console.warn(`Couleurs de dégradé invalides: "${color1}", "${color2}". Utilisation de la couleur par défaut.`);
            this.setColor('808080');
            return;
        }

        // Normaliser l'angle
        angle = angle.toString().replace('deg', '').trim();
        if (isNaN(angle)) {
            console.warn(`Angle invalide: "${angle}". Utilisation de 45 degrés.`);
            angle = '45';
        }
        angle = parseInt(angle) % 360;

        const hex1 = this.normalizeHex(color1);
        const hex2 = this.normalizeHex(color2);

        // Appliquer le dégradé
        const gradient = `linear-gradient(${angle}deg, ${hex1}, ${hex2})`;
        this.colorDisplay.style.backgroundImage = gradient;
        this.colorDisplay.style.backgroundColor = 'transparent';
    }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new ColorDisplay();
});
