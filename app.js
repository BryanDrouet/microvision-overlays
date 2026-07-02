// ========================================
// Configuration et constants
// ========================================
const CONFIG = {
    STORAGE_KEY_CONSENT: 'rgpd_consent',
    STORAGE_KEY_PRESETS: 'stream_presets',
    STORAGE_KEY_LAST_CAMERA: 'last_camera',
    STAT_UPDATE_INTERVAL: 1000,
    PRESETS_DEFAULT: [
        { name: 'Grue HD', type: 'iframe', url: '', camera: 'cam1' },
        { name: 'Trépied 4K', type: 'video', url: '', camera: 'cam2' },
        { name: 'Mobile Live', type: 'iframe', url: '', camera: 'cam3' },
    ]
};

// État global de l'application
const APP_STATE = {
    consentGiven: false,
    currentCamera: 'cam1',
    currentFluxType: 'iframe',
    isPlaying: false,
    presets: [],
    stats: {
        bitrate: 0,
        fps: 0,
        resolution: '0x0',
        latency: 0,
        startTime: null
    }
};

// ========================================
// Initialisation
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les icônes Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // Initialiser les éléments du DOM
    initializeElements();
    
    // Charger les préférences sauvegardées
    loadPresets();
    loadLastCamera();
    
    // Vérifier le consentement RGPD
    checkConsent();
    
    // Attacher les événements
    attachEventListeners();
});

// ========================================
// Gestion du consentement RGPD
// ========================================
function checkConsent() {
    const consent = localStorage.getItem(CONFIG.STORAGE_KEY_CONSENT);
    
    if (consent === 'accepted') {
        grantAccess();
    } else if (consent === 'refused') {
        handleRefusal();
    }
    // Sinon, la banneau reste affichée
}

function grantAccess() {
    const rgpdBanner = document.getElementById('rgpd-consent-banner');
    const appContainer = document.getElementById('app-container');
    
    rgpdBanner.setAttribute('aria-hidden', 'true');
    appContainer.setAttribute('aria-hidden', 'false');
    
    APP_STATE.consentGiven = true;
    localStorage.setItem(CONFIG.STORAGE_KEY_CONSENT, 'accepted');
}

function handleRefusal() {
    const rgpdBanner = document.getElementById('rgpd-consent-banner');
    const appContainer = document.getElementById('app-container');
    const videoWrapper = document.getElementById('video-wrapper');
    
    rgpdBanner.setAttribute('aria-hidden', 'true');
    appContainer.setAttribute('aria-hidden', 'true');
    
    videoWrapper.innerHTML = `
        <div class="video-placeholder">
            <p>❌ Le contenu vidéo est bloqué suite au refus des cookies.</p>
        </div>
    `;
}

// ========================================
// Initialisation du DOM
// ========================================
function initializeElements() {
    const acceptBtn = document.getElementById('accept-cookies');
    const refuseBtn = document.getElementById('refuse-cookies');
    
    acceptBtn.addEventListener('click', grantAccess);
    refuseBtn.addEventListener('click', () => {
        handleRefusal();
        localStorage.setItem(CONFIG.STORAGE_KEY_CONSENT, 'refused');
    });
}

// ========================================
// Gestion des événements
// ========================================
function attachEventListeners() {
    // Formulaire principal
    const streamForm = document.getElementById('stream-settings-form');
    streamForm.addEventListener('submit', handleStreamSubmit);
    
    // Boutons de contrôle
    document.getElementById('stop-stream-btn').addEventListener('click', stopStream);
    
    // Sélection de caméra
    document.getElementById('camera-select').addEventListener('change', (e) => {
        APP_STATE.currentCamera = e.target.value;
        saveLastCamera();
    });
    
    // Type de flux
    document.getElementById('flux-type-select').addEventListener('change', (e) => {
        APP_STATE.currentFluxType = e.target.value;
    });
    
    // Raccourcis caméras
    document.querySelectorAll('.shortcut-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const camera = e.currentTarget.dataset.camera;
            document.getElementById('camera-select').value = camera;
            APP_STATE.currentCamera = camera;
            saveLastCamera();
            updateShortcutButtons();
        });
    });
    
    // Bouton ajouter preset
    document.getElementById('add-preset-btn').addEventListener('click', addNewPreset);
}

// ========================================
// Gestion du flux vidéo
// ========================================
function handleStreamSubmit(e) {
    e.preventDefault();
    
    const sourceUrl = document.getElementById('stream-source-input').value.trim();
    const fluxType = document.getElementById('flux-type-select').value;
    const qualityLevel = document.getElementById('quality-select').value;
    
    if (!sourceUrl) {
        showError('Veuillez entrer une URL de flux.');
        return;
    }
    
    loadStream(sourceUrl, fluxType, qualityLevel);
    updateStreamUI();
}

function loadStream(url, type, quality) {
    const videoWrapper = document.getElementById('video-wrapper');
    
    try {
        videoWrapper.innerHTML = '';
        
        switch(type) {
            case 'iframe':
                loadIframeStream(url, videoWrapper);
                break;
            case 'video':
                loadVideoStream(url, videoWrapper, quality);
                break;
            case 'ndi':
                loadNDIStream(url, videoWrapper);
                break;
            case 'canvas':
                loadCanvasStream(url, videoWrapper);
                break;
            default:
                throw new Error(`Type de flux inconnu: ${type}`);
        }
        
        APP_STATE.isPlaying = true;
        APP_STATE.stats.startTime = Date.now();
        updateStatusIndicator('active');
        updateStreamInfoText();
        startStatsMonitoring();
        
        showSuccess(`Flux chargé avec succès (${type})`);
    } catch (error) {
        console.error('Erreur lors du chargement du flux:', error);
        showError(`Erreur: ${error.message}`);
        updateStatusIndicator('error');
        APP_STATE.isPlaying = false;
    }
}

function loadIframeStream(url, container) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    iframe.addEventListener('error', () => {
        showError('Impossible de charger l\'iframe. Vérifiez l\'URL.');
    });
    
    container.appendChild(iframe);
}

function loadVideoStream(url, container, quality) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.objectFit = 'contain';
    
    // Appliquer la qualité
    if (quality === 'low') {
        video.style.filter = 'blur(2px)';
    }
    
    video.addEventListener('error', (e) => {
        showError('Erreur lors de la lecture vidéo: ' + e.target.error.message);
    });
    
    video.addEventListener('play', () => {
        updateStatusIndicator('active');
        document.getElementById('live-status').textContent = 'En direct';
    });
    
    video.addEventListener('pause', () => {
        updateStatusIndicator('paused');
        document.getElementById('live-status').textContent = 'En pause';
    });
    
    container.appendChild(video);
}

function loadNDIStream(url, container) {
    // Note: Support NDI nécessite une configuration serveur spécifique
    // Cette implémentation affiche un placeholder avec instructions
    const placeholder = document.createElement('div');
    placeholder.style.width = '100%';
    placeholder.style.height = '100%';
    placeholder.style.display = 'flex';
    placeholder.style.flexDirection = 'column';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.color = '#a0a0ab';
    placeholder.style.textAlign = 'center';
    placeholder.innerHTML = `
        <p style="font-size: 1.1rem; margin-bottom: 10px;">🔗 Flux NDI</p>
        <p style="font-size: 0.9rem; margin-bottom: 20px;">URL: ${escapeHtml(url)}</p>
        <p style="font-size: 0.85rem; color: #6b6b7a;">
            Configuration NDI requise sur le serveur.<br>
            Assurez-vous que le serveur NDI est actif.
        </p>
    `;
    container.appendChild(placeholder);
    
    document.getElementById('live-status').textContent = 'NDI - Connexion';
}

function loadCanvasStream(url, container) {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    const ctx = canvas.getContext('2d');
    
    // Remplir avec un dégradé
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ajouter un texte
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Flux Canvas WebGL', canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.fillStyle = '#a0a0ab';
    ctx.font = '24px Arial';
    ctx.fillText(url, canvas.width / 2, canvas.height / 2 + 30);
    
    container.appendChild(canvas);
    document.getElementById('live-status').textContent = 'Canvas - Prêt';
}

function stopStream() {
    const videoWrapper = document.getElementById('video-wrapper');
    
    // Arrêter tous les éléments médias
    const iframes = videoWrapper.querySelectorAll('iframe');
    const videos = videoWrapper.querySelectorAll('video');
    
    iframes.forEach(iframe => iframe.remove());
    videos.forEach(video => {
        video.pause();
        video.src = '';
        video.remove();
    });
    
    videoWrapper.innerHTML = `
        <div class="video-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 7l-7 5 7 5V7z"></path>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <p>Flux arrêté</p>
        </div>
    `;
    
    APP_STATE.isPlaying = false;
    updateStatusIndicator('offline');
    document.getElementById('live-status').textContent = 'Arrêté';
    stopStatsMonitoring();
    document.getElementById('stream-source-input').value = '';
}

// ========================================
// Mise à jour de l'UI
// ========================================
function updateStreamUI() {
    const cameraSelect = document.getElementById('camera-select');
    const selectedOption = cameraSelect.options[cameraSelect.selectedIndex];
    const cameraName = selectedOption.text;
    
    document.getElementById('stream-title').textContent = cameraName;
    document.getElementById('stream-info').textContent = `Type: ${APP_STATE.currentFluxType}`;
    
    updateShortcutButtons();
}

function updateShortcutButtons() {
    document.querySelectorAll('.shortcut-btn').forEach(btn => {
        if (btn.dataset.camera === APP_STATE.currentCamera) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateStatusIndicator(status) {
    const statusDot = document.getElementById('status-dot');
    statusDot.classList.remove('active', 'error');
    
    if (status === 'active') {
        statusDot.classList.add('active');
    } else if (status === 'error') {
        statusDot.classList.add('error');
    }
}

function updateStreamInfoText() {
    const quality = document.getElementById('quality-select').value;
    const qualityMap = {
        'low': '360p',
        'medium': '720p',
        'high': '1080p',
        'ultra': '4K'
    };
    
    APP_STATE.stats.resolution = qualityMap[quality] || '720p';
}

// ========================================
// Surveillance des statistiques
// ========================================
let statsInterval = null;

function startStatsMonitoring() {
    if (statsInterval) clearInterval(statsInterval);
    
    statsInterval = setInterval(() => {
        updateStats();
    }, CONFIG.STAT_UPDATE_INTERVAL);
}

function stopStatsMonitoring() {
    if (statsInterval) {
        clearInterval(statsInterval);
        statsInterval = null;
    }
}

function updateStats() {
    // Mise à jour simulée (en production, utiliser des vraies métriques)
    const elapsed = (Date.now() - APP_STATE.stats.startTime) / 1000;
    
    APP_STATE.stats.bitrate = (Math.random() * 8 + 2).toFixed(1);
    APP_STATE.stats.fps = Math.floor(Math.random() * 30 + 50);
    APP_STATE.stats.latency = Math.floor(Math.random() * 100 + 10);
    
    document.getElementById('stat-bitrate').textContent = APP_STATE.stats.bitrate + ' Mbps';
    document.getElementById('stat-fps').textContent = APP_STATE.stats.fps + ' fps';
    document.getElementById('stat-resolution').textContent = APP_STATE.stats.resolution;
    document.getElementById('stat-latency').textContent = APP_STATE.stats.latency + ' ms';
}

// ========================================
// Gestion des presets
// ========================================
function loadPresets() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_PRESETS);
    APP_STATE.presets = saved ? JSON.parse(saved) : [...CONFIG.PRESETS_DEFAULT];
    renderPresets();
}

function savePresets() {
    localStorage.setItem(CONFIG.STORAGE_KEY_PRESETS, JSON.stringify(APP_STATE.presets));
    renderPresets();
}

function renderPresets() {
    const presetsGrid = document.getElementById('presets-grid');
    presetsGrid.innerHTML = '';
    
    APP_STATE.presets.forEach((preset, index) => {
        const btn = document.createElement('button');
        btn.className = 'preset-btn';
        btn.textContent = preset.name;
        btn.type = 'button';
        
        btn.addEventListener('click', () => {
            document.getElementById('stream-source-input').value = preset.url;
            document.getElementById('flux-type-select').value = preset.type;
            document.getElementById('camera-select').value = preset.camera;
            APP_STATE.currentCamera = preset.camera;
            saveLastCamera();
            
            if (preset.url) {
                document.getElementById('stream-settings-form').dispatchEvent(new Event('submit'));
            }
        });
        
        // Bouton de suppression
        const deleteBtn = document.createElement('button');
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.top = '2px';
        deleteBtn.style.right = '2px';
        deleteBtn.style.width = '16px';
        deleteBtn.style.height = '16px';
        deleteBtn.style.padding = '0';
        deleteBtn.style.backgroundColor = 'transparent';
        deleteBtn.style.border = 'none';
        deleteBtn.style.color = 'var(--danger-color)';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.fontSize = '12px';
        deleteBtn.innerHTML = '✕';
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            APP_STATE.presets.splice(index, 1);
            savePresets();
        });
        
        btn.style.position = 'relative';
        btn.appendChild(deleteBtn);
        presetsGrid.appendChild(btn);
    });
}

function addNewPreset() {
    const url = document.getElementById('stream-source-input').value.trim();
    
    if (!url) {
        showError('Veuillez d\'abord configurer un flux.');
        return;
    }
    
    const name = prompt('Nom du preset:');
    if (!name) return;
    
    APP_STATE.presets.push({
        name: name,
        type: APP_STATE.currentFluxType,
        url: url,
        camera: APP_STATE.currentCamera
    });
    
    savePresets();
    showSuccess(`Preset "${name}" créé`);
}

// ========================================
// Gestion de la dernière caméra utilisée
// ========================================
function saveLastCamera() {
    localStorage.setItem(CONFIG.STORAGE_KEY_LAST_CAMERA, APP_STATE.currentCamera);
}

function loadLastCamera() {
    const last = localStorage.getItem(CONFIG.STORAGE_KEY_LAST_CAMERA);
    if (last) {
        APP_STATE.currentCamera = last;
        document.getElementById('camera-select').value = last;
        updateShortcutButtons();
    }
}

// ========================================
// Notifications et erreurs
// ========================================
function showError(message) {
    showNotification(message, 'error');
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('error-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `error-message error-${type}`;
    messageDiv.textContent = message;
    messageDiv.setAttribute('role', 'alert');
    
    container.appendChild(messageDiv);
    container.setAttribute('aria-hidden', 'false');
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
            if (container.children.length === 0) {
                container.setAttribute('aria-hidden', 'true');
            }
        }, 300);
    }, 5000);
}

// ========================================
// Utilitaires
// ========================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Support des touches clavier
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('stream-settings-form').dispatchEvent(new Event('submit'));
    }
    if (e.key === 'Escape') {
        stopStream();
    }
});

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
});

console.log('✓ Application Studio chargée et prête');
