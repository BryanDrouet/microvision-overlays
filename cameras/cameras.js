// ========================================
// Gestionnaire de caméras
// ========================================

const CAMERAS_CONFIG = {
    STORAGE_KEY: 'stream_cameras',
    DEFAULT_CAMERAS: [
        {
            id: 'cam1',
            name: 'Caméra Grue',
            icon: '🎥',
            description: 'Vue principale sur grue motorisée',
            defaultQuality: 'high',
            fluxUrl: '',
            fluxType: 'iframe'
        },
        {
            id: 'cam2',
            name: 'Caméra Trépied',
            icon: '📸',
            description: 'Vue fixe stable sur trépied',
            defaultQuality: 'medium',
            fluxUrl: '',
            fluxType: 'iframe'
        },
        {
            id: 'cam3',
            name: 'Caméra Mobile',
            icon: '🎬',
            description: 'Vue dynamique et cinématique',
            defaultQuality: 'medium',
            fluxUrl: '',
            fluxType: 'video'
        },
        {
            id: 'cam4',
            name: 'Caméra Drone',
            icon: '🚁',
            description: 'Vue aérienne du plateau',
            defaultQuality: 'high',
            fluxUrl: '',
            fluxType: 'iframe'
        }
    ]
};

let camerasData = [];
let currentEditingCamera = null;

// ========================================
// Initialisation
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    loadCameras();
    renderCameras();
    attachEventListeners();
});

// ========================================
// Gestion des caméras
// ========================================
function loadCameras() {
    const saved = localStorage.getItem(CAMERAS_CONFIG.STORAGE_KEY);
    camerasData = saved ? JSON.parse(saved) : [...CAMERAS_CONFIG.DEFAULT_CAMERAS];
}

function saveCameras() {
    localStorage.setItem(CAMERAS_CONFIG.STORAGE_KEY, JSON.stringify(camerasData));
    showNotification('Caméras sauvegardées', 'success');
}

function renderCameras() {
    renderGrid();
    renderList();
}

function renderGrid() {
    const grid = document.getElementById('cameras-grid');
    grid.innerHTML = '';

    camerasData.forEach(camera => {
        const card = document.createElement('div');
        card.className = 'camera-card';
        card.innerHTML = `
            <div class="camera-card-icon">${camera.icon}</div>
            <div class="camera-card-name">${camera.name}</div>
            <div class="camera-card-id">#${camera.id}</div>
            <div class="camera-card-status">${camera.fluxUrl ? '✓ Configuré' : '⚠️ Non configuré'}</div>
        `;

        card.addEventListener('click', () => {
            currentEditingCamera = camera;
            openEditModal(camera);
        });

        grid.appendChild(card);
    });
}

function renderList() {
    const list = document.getElementById('cameras-list');
    list.innerHTML = '';

    camerasData.forEach(camera => {
        const item = document.createElement('div');
        item.className = 'camera-item';
        
        const statusBadge = camera.fluxUrl ? 
            `<span class="camera-meta-badge">✓ Flux configuré</span>` : 
            `<span class="camera-meta-badge">⚠️ Pas de flux</span>`;

        item.innerHTML = `
            <div class="camera-item-info">
                <div class="camera-item-header">
                    <div class="camera-item-icon">${camera.icon}</div>
                    <div class="camera-item-titles">
                        <div class="camera-item-name">${camera.name}</div>
                        <div class="camera-item-id">${camera.id}</div>
                    </div>
                </div>
                ${camera.description ? `<div class="camera-item-description">${camera.description}</div>` : ''}
                <div class="camera-item-meta">
                    <span class="camera-meta-badge">📊 ${camera.defaultQuality}</span>
                    <span class="camera-meta-badge">🎬 ${camera.fluxType}</span>
                    ${statusBadge}
                </div>
            </div>
            <div class="camera-item-actions">
                <button class="btn btn-primary edit-btn" data-id="${camera.id}">
                    <i data-lucide="edit" style="width: 16px; height: 16px;"></i>
                    Éditer
                </button>
                <button class="btn btn-secondary view-flux-btn" data-id="${camera.id}">
                    <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
                    Aperçu
                </button>
                <button class="btn btn-danger delete-btn" data-id="${camera.id}">
                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                    Supprimer
                </button>
            </div>
        `;

        list.appendChild(item);
    });

    attachCameraItemListeners();
}

// ========================================
// Événements
// ========================================
function attachEventListeners() {
    // Formulaire d'ajout
    document.getElementById('add-camera-form').addEventListener('submit', handleAddCamera);

    // Formulaire d'édition
    document.getElementById('edit-camera-form').addEventListener('submit', handleEditCamera);

    // Bouton de fermeture modal
    document.querySelector('.modal .btn-close').addEventListener('click', closeEditModal);
    document.querySelector('.btn-cancel').addEventListener('click', closeEditModal);

    // Paramètres globaux
    document.getElementById('export-cameras-btn').addEventListener('click', exportCameras);
    document.getElementById('import-cameras-btn').addEventListener('click', () => {
        document.getElementById('import-file-input').click();
    });
    document.getElementById('import-file-input').addEventListener('change', importCameras);
    document.getElementById('reset-cameras-btn').addEventListener('click', resetCameras);

    // Clic sur modal (fermer si on clique dehors)
    document.getElementById('edit-modal').addEventListener('click', (e) => {
        if (e.target.id === 'edit-modal') {
            closeEditModal();
        }
    });
}

function attachCameraItemListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const camera = camerasData.find(c => c.id === id);
            if (camera) {
                currentEditingCamera = camera;
                openEditModal(camera);
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            if (confirm('Êtes-vous sûr de vouloir supprimer cette caméra ?')) {
                deleteCamera(id);
            }
        });
    });

    document.querySelectorAll('.view-flux-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const camera = camerasData.find(c => c.id === id);
            if (camera && camera.fluxUrl) {
                window.open('../index.html?camera=' + camera.id + '&url=' + encodeURIComponent(camera.fluxUrl));
            } else {
                showNotification('Aucun flux configuré pour cette caméra', 'error');
            }
        });
    });
}

// ========================================
// Formulaires
// ========================================
function handleAddCamera(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const id = formData.get('cameraId').trim();

    // Vérifier l'unicité de l'ID
    if (camerasData.find(c => c.id === id)) {
        showNotification('Cet ID de caméra existe déjà', 'error');
        return;
    }

    const newCamera = {
        id: id,
        name: formData.get('cameraName'),
        icon: formData.get('cameraIcon') || '🎥',
        description: formData.get('cameraDescription'),
        defaultQuality: formData.get('cameraQuality'),
        fluxUrl: formData.get('cameraFluxUrl'),
        fluxType: formData.get('cameraFluxType')
    };

    camerasData.push(newCamera);
    saveCameras();
    renderCameras();
    e.target.reset();
    showNotification(`Caméra "${newCamera.name}" ajoutée`, 'success');
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

function openEditModal(camera) {
    document.getElementById('modal-title').textContent = `Éditer: ${camera.name}`;
    document.getElementById('edit-camera-name').value = camera.name;
    document.getElementById('edit-camera-icon').value = camera.icon;
    document.getElementById('edit-camera-description').value = camera.description || '';
    document.getElementById('edit-camera-quality').value = camera.defaultQuality;
    document.getElementById('edit-camera-flux-url').value = camera.fluxUrl || '';
    document.getElementById('edit-camera-flux-type').value = camera.fluxType;

    document.getElementById('edit-modal').setAttribute('aria-hidden', 'false');
}

function closeEditModal() {
    document.getElementById('edit-modal').setAttribute('aria-hidden', 'true');
    document.getElementById('edit-camera-form').reset();
    currentEditingCamera = null;
}

function handleEditCamera(e) {
    e.preventDefault();

    if (!currentEditingCamera) return;

    const formData = new FormData(e.target);
    const index = camerasData.findIndex(c => c.id === currentEditingCamera.id);

    if (index !== -1) {
        camerasData[index] = {
            ...camerasData[index],
            name: formData.get('cameraName'),
            icon: formData.get('cameraIcon') || camerasData[index].icon,
            description: formData.get('cameraDescription'),
            defaultQuality: formData.get('cameraQuality'),
            fluxUrl: formData.get('cameraFluxUrl'),
            fluxType: formData.get('cameraFluxType')
        };

        saveCameras();
        renderCameras();
        closeEditModal();
        showNotification('Caméra mise à jour', 'success');
        
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

function deleteCamera(id) {
    camerasData = camerasData.filter(c => c.id !== id);
    saveCameras();
    renderCameras();
    showNotification('Caméra supprimée', 'success');
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

// ========================================
// Import/Export
// ========================================
function exportCameras() {
    const dataStr = JSON.stringify(camerasData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cameras-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Caméras exportées', 'success');
}

function importCameras(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            
            if (!Array.isArray(imported)) {
                throw new Error('Format invalide');
            }

            // Fusionner avec les caméras existantes
            const existingIds = camerasData.map(c => c.id);
            const newCameras = imported.filter(c => !existingIds.includes(c.id));
            
            camerasData.push(...newCameras);
            saveCameras();
            renderCameras();
            showNotification(`${newCameras.length} caméra(s) importée(s)`, 'success');
            
            if (window.lucide) {
                lucide.createIcons();
            }
        } catch (error) {
            showNotification('Erreur lors de l\'import: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);

    // Réinitialiser l'input
    e.target.value = '';
}

function resetCameras() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les caméras par défaut ? Les modifications seront perdues.')) {
        camerasData = [...CAMERAS_CONFIG.DEFAULT_CAMERAS];
        saveCameras();
        renderCameras();
        showNotification('Caméras réinitialisées par défaut', 'success');
        
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// ========================================
// Notifications
// ========================================
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Support clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('edit-modal').getAttribute('aria-hidden') === 'false') {
        closeEditModal();
    }
});

console.log('✓ Gestionnaire de caméras chargé');
