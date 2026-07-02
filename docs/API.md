# Référence API JavaScript

## Configuration globale

### `CONFIG`

Objet contenant les constantes de l'application.

```javascript
CONFIG = {
    STORAGE_KEY_CONSENT: 'rgpd_consent',      // Clé localStorage consentement
    STORAGE_KEY_PRESETS: 'stream_presets',    // Clé localStorage presets
    STORAGE_KEY_LAST_CAMERA: 'last_camera',   // Clé localStorage dernière caméra
    STAT_UPDATE_INTERVAL: 1000,                // Mise à jour stats (ms)
    PRESETS_DEFAULT: [...]                     // Presets par défaut
}
```

### `APP_STATE`

État global de l'application.

```javascript
APP_STATE = {
    consentGiven: boolean,          // Consentement RGPD
    currentCamera: string,          // Caméra actuelle (cam1-4)
    currentFluxType: string,        // Type de flux (iframe, video, ndi, canvas)
    isPlaying: boolean,             // Flux en cours ?
    presets: array,                 // Liste des presets
    stats: {
        bitrate: number,            // Débit en Mbps
        fps: number,                // Images par seconde
        resolution: string,         // Résolution "1920x1080"
        latency: number,            // Latence en ms
        startTime: timestamp         // Moment du démarrage
    }
}
```

## Fonctions publiques

### Gestion du consentement

#### `checkConsent()`

Vérifie le consentement RGPD sauvegardé.

```javascript
checkConsent();
```

#### `grantAccess()`

Accorde l'accès à l'application.

```javascript
grantAccess();
```

#### `handleRefusal()`

Bloque l'application après refus du consentement.

```javascript
handleRefusal();
```

### Gestion du flux vidéo

#### `loadStream(url, type, quality)`

Charge un flux vidéo.

**Paramètres** :
- `url` (string) : URL du flux
- `type` (string) : "iframe" | "video" | "ndi" | "canvas"
- `quality` (string) : "low" | "medium" | "high" | "ultra"

```javascript
loadStream('https://youtube.com/embed/VIDEO_ID', 'iframe', 'medium');
```

#### `stopStream()`

Arrête le flux en cours.

```javascript
stopStream();
```

#### `loadIframeStream(url, container)`

Charge une iframe (interne).

```javascript
loadIframeStream('https://twitch.tv/...', document.getElementById('video-wrapper'));
```

#### `loadVideoStream(url, container, quality)`

Charge une vidéo HTML5 (interne).

```javascript
loadVideoStream('video.mp4', container, 'high');
```

### Gestion des presets

#### `loadPresets()`

Charge les presets depuis localStorage.

```javascript
loadPresets();
```

#### `savePresets()`

Sauvegarde les presets dans localStorage.

```javascript
savePresets();
```

#### `renderPresets()`

Affiche les presets dans l'interface.

```javascript
renderPresets();
```

#### `addNewPreset()`

Ajoute un nouveau preset.

```javascript
addNewPreset();
```

### Gestion des caméras

#### `saveLastCamera()`

Sauvegarde la dernière caméra utilisée.

```javascript
saveLastCamera();
```

#### `loadLastCamera()`

Charge la dernière caméra utilisée.

```javascript
loadLastCamera();
```

#### `updateShortcutButtons()`

Met à jour l'état visuel des raccourcis caméras.

```javascript
updateShortcutButtons();
```

### Statistiques

#### `startStatsMonitoring()`

Démarre la mise à jour des statistiques (toutes les secondes).

```javascript
startStatsMonitoring();
```

#### `stopStatsMonitoring()`

Arrête la mise à jour des statistiques.

```javascript
stopStatsMonitoring();
```

#### `updateStats()`

Met à jour les valeurs de statistiques affichées.

```javascript
updateStats();
// Affiche dans l'interface :
// - Débit (Mbps)
// - FPS
// - Résolution
// - Latence (ms)
```

### UI et notifications

#### `updateStreamUI()`

Met à jour l'interface après changement de flux.

```javascript
updateStreamUI();
```

#### `updateStatusIndicator(status)`

Met à jour l'indicateur de statut.

**Paramètres** :
- `status` (string) : "active" | "paused" | "error" | "offline"

```javascript
updateStatusIndicator('active');    // Vert
updateStatusIndicator('error');     // Rouge
updateStatusIndicator('offline');   // Gris
```

#### `showError(message)`

Affiche une notification d'erreur.

```javascript
showError('Impossible de charger le flux');
```

#### `showSuccess(message)`

Affiche une notification de succès.

```javascript
showSuccess('Flux chargé avec succès');
```

#### `showNotification(message, type)`

Affiche une notification personnalisée.

**Paramètres** :
- `message` (string) : Texte à afficher
- `type` (string) : "info" | "success" | "error" (défaut: "info")

```javascript
showNotification('Opération complétée', 'success');
```

## Événements

### Événement : "submit" du formulaire

Déclenche `handleStreamSubmit()`.

```javascript
document.getElementById('stream-settings-form').addEventListener('submit', (e) => {
    // Charge le flux avec les paramètres du formulaire
});
```

### Événement : Changement de caméra

```javascript
document.getElementById('camera-select').addEventListener('change', (e) => {
    APP_STATE.currentCamera = e.target.value;
});
```

### Événement : Changement de type de flux

```javascript
document.getElementById('flux-type-select').addEventListener('change', (e) => {
    APP_STATE.currentFluxType = e.target.value;
});
```

### Événement : Raccourcis caméras

```javascript
document.querySelectorAll('.shortcut-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Change la caméra
    });
});
```

## localStorage

### Clés utilisées

| Clé | Valeur | Exemple |
|-----|--------|---------|
| `rgpd_consent` | "accepted" \| "refused" | "accepted" |
| `stream_presets` | JSON array | `[{name:"...", url:"..."}]` |
| `last_camera` | "cam1" \| "cam2" \| "cam3" \| "cam4" | "cam2" |

### Accès direct

```javascript
// Lire le consentement
const consent = localStorage.getItem('rgpd_consent');

// Sauvegarder un preset personnalisé
const presets = JSON.parse(localStorage.getItem('stream_presets'));
presets.push({name: "Mon flux", url: "https://...", type: "video", camera: "cam1"});
localStorage.setItem('stream_presets', JSON.stringify(presets));
```

## Structure du preset

```javascript
{
    name: string,        // Nom affiché
    type: string,        // "iframe" | "video" | "ndi" | "canvas"
    url: string,         // URL complète du flux
    camera: string       // "cam1" | "cam2" | "cam3" | "cam4"
}
```

## Structure des statistiques

```javascript
{
    bitrate: number,      // ex: 5.2 (Mbps)
    fps: number,          // ex: 30
    resolution: string,   // ex: "1920x1080"
    latency: number,      // ex: 45 (ms)
    startTime: timestamp  // ex: 1688123456789
}
```

## Constantes de qualité

```javascript
QUALITY_LEVELS = {
    low: { resolution: "360p", bitrate: "1 Mbps", fps: 24 },
    medium: { resolution: "720p", bitrate: "4 Mbps", fps: 30 },
    high: { resolution: "1080p", bitrate: "8 Mbps", fps: 60 },
    ultra: { resolution: "2160p", bitrate: "20 Mbps", fps: 60 }
}
```

## Intégration personnalisée

### Charger un flux depuis l'extérieur

```javascript
// Depuis la console ou un script externe
window.loadStream('https://...', 'video', 'high');
```

### Ajouter un preset programmatiquement

```javascript
APP_STATE.presets.push({
    name: "Mon flux custom",
    type: "iframe",
    url: "https://example.com",
    camera: "cam1"
});
savePresets();
renderPresets();
```

### Récupérer l'état global

```javascript
console.log(APP_STATE.currentCamera);  // Caméra active
console.log(APP_STATE.stats);          // Stats en temps réel
console.log(APP_STATE.presets);        // Tous les presets
```

## Débogage

### Console du navigateur

Ouvrir avec **F12** ou **Ctrl+Maj+I**.

```javascript
// Voir l'état complet
console.log(APP_STATE);

// Voir les presets
console.log(JSON.stringify(APP_STATE.presets, null, 2));

// Simuler un changement
APP_STATE.currentCamera = 'cam3';
updateShortcutButtons();

// Tester une notification
showError('Test d\'erreur');
showSuccess('Test de succès');
```

### Fonctions de test

```javascript
// Tester le chargement d'un flux
loadStream('https://www.youtube.com/embed/dQw4w9WgXcQ', 'iframe', 'medium');

// Tester l'arrêt
stopStream();

// Tester les stats
startStatsMonitoring();
setTimeout(() => stopStatsMonitoring(), 5000); // Arrête après 5s
```

## Erreurs courantes

### "Cannot read property 'value' of null"

**Cause** : Élément DOM inexistant

**Solution** :
```javascript
if (document.getElementById('stream-source-input')) {
    const url = document.getElementById('stream-source-input').value;
}
```

### "localStorage is not available"

**Cause** : Navigateur en mode incognito ou permissions manquantes

**Solution** : Utilisez plutôt les variables globales `APP_STATE`.

### "Cannot set property 'src' of undefined"

**Cause** : Conteneur vidéo vide

**Solution** : Vérifiez que `#video-wrapper` existe.

## Modification du comportement

### Changer l'intervalle de mise à jour des stats

```javascript
// Dans config, modifier :
CONFIG.STAT_UPDATE_INTERVAL = 2000; // Toutes les 2 secondes au lieu de 1
```

### Ajouter une nouvelle qualité

```javascript
// Modifier config.json ou ajouter dynamiquement
const qualitySelect = document.getElementById('quality-select');
const option = document.createElement('option');
option.value = 'custom';
option.textContent = 'Custom (960p)';
qualitySelect.appendChild(option);
```

### Logger tous les changements de flux

```javascript
const originalLoadStream = window.loadStream;
window.loadStream = function(url, type, quality) {
    console.log(`[LOG] Chargement: ${type} @ ${quality} - ${url}`);
    return originalLoadStream(url, type, quality);
};
```

## Support des anciennes versions navigateur

L'application utilise des fonctionnalités ES6 modernes. Pour les vieux navigateurs :

```html
<!-- Ajouter avant app.js -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es2015"></script>
```

## Licence et contribution

Le code est libre de modification. Contribuez en créant des pull requests !
