# 🎥 Gestionnaire de caméras

## Description

Le **Gestionnaire de caméras** (`/cameras/`) est une interface CRUD complète pour configurer, modifier et gérer vos caméras et leurs flux vidéo.

## 🚀 Accès

```
https://microvision-overlays.bryan.ovh/cameras/
```

## 🎛️ Fonctionnalités principales

### 1. **Vue grille des caméras**

Affichage visuel de toutes vos caméras configurées :

- Chaque caméra affiche :
  - **Emoji** : Icône visuelle (🎥, 📸, 🎬, 🚁, etc.)
  - **Nom** : Titre de la caméra
  - **ID** : Identifiant unique (cam1, cam2, etc.)
  - **Statut** : Indicateur de l'état

- **Actions rapides** :
  - 🖱️ Cliquer sur une caméra pour l'éditer
  - Charger directement une caméra dans le [Studio Principal](./STUDIO.md)

### 2. **Ajouter une nouvelle caméra**

Formulaire pour créer une caméra :

- **ID de la caméra** (obligatoire)
  - Format libre : `cam5`, `cam_outdoor`, `main_camera`
  - Doit être unique
  - Utilisé comme référence dans le code

- **Nom** (obligatoire)
  - Ex: "Caméra principale", "Drone studio"
  - Affiché à l'écran

- **Emoji** (optionnel)
  - 1-2 caractères maximum
  - Ex: 🎥, 📸, 🎬, 🚁, 🌍

- **Description** (optionnel)
  - Notes sur la caméra
  - Ex: "Caméra extérieure résolution 1080p"

- **Qualité par défaut**
  - `Basse (360p)`
  - `Moyenne (720p)` (défaut)
  - `Haute (1080p)`
  - `Ultra (4K)`

- **URL du flux** (optionnel)
  - Lien vers le flux vidéo
  - Ex: `https://twitch.tv/embed/username`

- **Type de flux** (optionnel)
  - `Iframe Web` : Streamers
  - `Vidéo HTML5` : Fichiers vidéo
  - `NDI` : Flux réseau
  - `Canvas WebGL` : Contenu personnalisé

### 3. **Configuration détaillée**

Liste complète de vos caméras avec actions :

Pour chaque caméra :
- **Informations** : ID, nom, description, statut
- **Métadonnées** : URL du flux, type de flux, qualité
- **Actions** :
  - ✏️ **Éditer** : Modifier la caméra
  - 🚀 **Charger** : Lancer la caméra dans le Studio
  - 🗑️ **Supprimer** : Enlever définitivement

### 4. **Modal d'édition**

Fenêtre pour modifier une caméra existante :

- Les mêmes champs que l'ajout
- Pré-remplis avec les valeurs actuelles
- Boutons :
  - **Enregistrer** : Appliquer les modifications
  - **Annuler** : Fermer sans sauvegarder

### 5. **Paramètres d'import/export**

Gérez vos configurations de masse :

- **Exporter les caméras**
  - Télécharge un fichier JSON avec toutes les caméras
  - Utile pour sauvegarder ou partager
  - Format :
    ```json
    [
      {
        "id": "cam1",
        "name": "Caméra Grue",
        "icon": "🎥",
        "description": "...",
        "qualityDefault": "medium",
        "fluxUrl": "https://...",
        "fluxType": "iframe"
      }
    ]
    ```

- **Importer les caméras**
  - Charge un fichier JSON dans le gestionnaire
  - Remplace ou fusionne avec les caméras existantes
  - Pratique pour restaurer une sauvegarde

- **Réinitialiser les paramètres par défaut**
  - Restaure les 4 caméras de base (Grue, Trépied, Mobile, Drone)
  - Utile après une mauvaise manipulation

## 💾 Données persistantes

Les caméras sont sauvegardées dans `localStorage` :

| Clé | Contenu |
|-----|---------|
| `stream_cameras` | Tableau JSON de toutes vos caméras |

**Format stocké :**
```json
{
  "id": "cam1",
  "name": "Caméra Grue",
  "icon": "🎥",
  "description": "Grue studio HD",
  "qualityDefault": "high",
  "fluxUrl": "https://twitch.tv/...",
  "fluxType": "iframe"
}
```

## 📋 Caméras par défaut

À l'installation, 4 caméras sont préconfigurées :

| ID | Nom | Emoji | Qualité | Type |
|----|-----|-------|---------|------|
| cam1 | Caméra Grue | 🎥 | Moyenne | - |
| cam2 | Caméra Trépied | 📸 | Moyenne | - |
| cam3 | Caméra Mobile | 🎬 | Moyenne | - |
| cam4 | Caméra Drone | 🚁 | Moyenne | - |

## 🔗 Navigation

- **Bouton "Retour"** : Revient à l'[interface Studio](./STUDIO.md)
- **"Charger"** : Lance la caméra dans le Studio
- **"Éditer"** : Ouvre la modal d'édition

## 💡 Cas d'utilisation

### Ajouter une caméra YouTube

```
ID : youtube_main
Nom : YouTube Live
Emoji : 📺
URL : https://www.youtube.com/embed/[VIDEO_ID]?autoplay=1
Type : Iframe Web
Qualité : Haute (1080p)
```

### Ajouter une source NDI

```
ID : studio_ndi
Nom : Studio NDI
Emoji : 🌐
URL : ndi://192.168.1.100/OBS_Studio
Type : NDI
Qualité : Ultra (4K)
```

### Ajouter un flux WebRTC

```
ID : webrtc_cam
Nom : WebRTC externe
Emoji : 📡
URL : wss://example.com/webrtc/stream
Type : Vidéo HTML5
Qualité : Haute (1080p)
```

## ⚙️ API localStorage (Développeurs)

```javascript
// Récupérer toutes les caméras
const cameras = JSON.parse(localStorage.getItem('stream_cameras') || '[]');

// Ajouter une caméra
cameras.push({
  id: 'cam5',
  name: 'Nouvelle caméra',
  icon: '🎥',
  description: 'Description',
  qualityDefault: 'high',
  fluxUrl: 'https://...',
  fluxType: 'iframe'
});
localStorage.setItem('stream_cameras', JSON.stringify(cameras));

// Mettre à jour une caméra
const cam = cameras.find(c => c.id === 'cam1');
if (cam) {
  cam.name = 'Grue mise à jour';
  localStorage.setItem('stream_cameras', JSON.stringify(cameras));
}

// Supprimer une caméra
const filtered = cameras.filter(c => c.id !== 'cam1');
localStorage.setItem('stream_cameras', JSON.stringify(filtered));
```

## 🐛 Dépannage

| Problème | Solution |
|----------|----------|
| Caméra n'apparaît pas | Rechargez la page, vérifiez localStorage |
| Erreur "ID déjà utilisé" | Choisissez un ID unique |
| Import échoue | Vérifiez le format JSON du fichier |
| Les modifications ne se sauvegardent pas | Vérifiez que les cookies/localStorage sont activés |

## 📊 Limitations

- **Maximum de caméras** : Non limité (dépend de l'espace localStorage, ~5-10 Mo)
- **Longueur de l'ID** : Recommandé < 20 caractères
- **Longueur du nom** : Recommandé < 50 caractères
- **Format emoji** : 1-2 caractères Unicode

## 🔄 Synchronisation

⚠️ **Attention** : Les caméras ne se synchronisent PAS automatiquement entre appareils.

Pour synchroniser :
1. Exportez les caméras depuis l'appareil source
2. Téléchargez le fichier JSON
3. Importez-le sur l'autre appareil

---

**Besoin d'aide ?** Consultez aussi :
- [Studio Principal](./STUDIO.md)
- [Page couleur](./COLOR.md)
- [Écrans Minecraft](./SCREENS.md)
