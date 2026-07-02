# 📺 Studio Principal

## Description

L'interface **Studio Principal** (`/index.html`) est le centre de contrôle pour gérer les flux vidéo en direct. Elle permet de charger, configurer et monitorer des flux vidéo provenant de diverses sources (Twitch, YouTube, NDI, WebRTC, HTML5).

## 🚀 Accès

```
https://microvision-overlays.bryan.ovh/
```

## 🎛️ Fonctionnalités principales

### 1. **Configuration du flux**

Formulaire permettant de configurer le flux vidéo en direct :

- **Source du flux (URL)** : Entrez l'URL du flux
  - Accepte : `https://`, `http://`, `rtmp://`, `ndi://`
  
- **Type de flux** : Sélectionnez le type de source
  - `Iframe Web` : Streamers (Twitch, YouTube, etc.)
  - `Vidéo HTML5` : Fichiers MP4, HLS, WebRTC
  - `NDI` : Network Device Interface (flux réseau)
  - `Canvas 3D` : Contenu WebGL personnalisé

- **Caméra** : Sélectionnez une caméra prédéfinie
  - 🎥 Caméra Grue (Cam 1)
  - 📸 Caméra Trépied (Cam 2)
  - 🎬 Caméra Mobile (Cam 3)
  - 🚁 Caméra Drone (Cam 4)

- **Qualité** : Définissez la qualité du flux
  - `Basse (360p)` : 1 Mbps, 24 fps
  - `Moyenne (720p)` : 4 Mbps, 30 fps (par défaut)
  - `Haute (1080p)` : 8 Mbps, 60 fps
  - `Ultra (4K)` : 20 Mbps, 60 fps

### 2. **Contrôles**

- **Mettre à jour** : Lance le chargement du flux avec les paramètres configurés
- **Arrêter** : Arrête le flux en cours de lecture

### 3. **Raccourcis caméras**

Boutons rapides pour charger instantanément une caméra préenregistrée :
- Grue, Trépied, Mobile, Drone

### 4. **Presets de flux**

Sauvegardez et chargez rapidement des configurations complètes :
- Ajouter un preset avec un nom (ex: "Grue HD", "Trépied 4K")
- Les presets sont sauvegardés dans `localStorage`
- Cliquez sur un preset pour charger sa configuration

### 5. **Informations du flux**

Panneau de statistiques en temps réel :
- **Débit (Mbps)** : Bande passante utilisée
- **FPS** : Images par seconde
- **Résolution** : Dimensions du flux (ex: 1920x1080)
- **Latence (ms)** : Délai d'affichage

## 💾 Données persistantes

Grâce à `localStorage`, l'application sauvegarde automatiquement :

| Clé | Contenu | Durée |
|-----|---------|-------|
| `stream_presets` | Liste de vos presets | Permanent |
| `last_camera` | Dernière caméra utilisée | Permanent |
| `rgpd_consent` | Consentement aux cookies | Permanent |

## 🔐 Consentement RGPD

À la première visite, une banneau demande votre consentement aux cookies techniques. Vous pouvez :
- **Accepter** : L'interface se déverrouille et vos préférences sont sauvegardées
- **Refuser** : L'interface reste bloquée (les cookies ne sont pas sauvegardés)

## 📱 Responsive

L'interface s'adapte à tous les écrans :
- ✅ Desktop (1024px+)
- ✅ Tablette (768px-1023px)
- ✅ Mobile (480px-767px)
- ✅ Ultra-mobile (<480px)

## 🔗 Navigation

- **Bouton "Caméras"** (haut-droit) : Ouvre le [Gestionnaire de caméras](./CAMERAS.md)
- **Lien "Retour"** : Dans le gestionnaire de caméras, revient ici

## 💡 Conseils d'utilisation

### Charger un flux Twitch

```
Type : Iframe Web
URL : https://www.twitch.tv/embed/[USERNAME]/chat?parent=microvision-overlays.bryan.ovh
```

### Charger un flux YouTube

```
Type : Iframe Web
URL : https://www.youtube.com/embed/[VIDEO_ID]?autoplay=1
```

### Charger un flux NDI local

```
Type : NDI
URL : ndi://[ADRESSE_IP]/[NOM_SOURCE]
```

### Charger un fichier vidéo

```
Type : Vidéo HTML5
URL : https://example.com/video.mp4
```

## ⚙️ Paramètres avancés

### localStorage API (pour développeurs)

```javascript
// Charger les presets
const presets = JSON.parse(localStorage.getItem('stream_presets') || '[]');

// Sauvegarder un preset personnalisé
const myPreset = {
  name: 'Mon flux',
  type: 'iframe',
  url: 'https://...',
  camera: 'cam1'
};
presets.push(myPreset);
localStorage.setItem('stream_presets', JSON.stringify(presets));
```

## 🐛 Dépannage

| Problème | Solution |
|----------|----------|
| Flux ne s'affiche pas | Vérifiez l'URL, le type de flux et les autorisations CORS |
| Stats affichent "--" | Attendez quelques secondes, les stats se mettent à jour toutes les secondes |
| Cookies refusés | Rechargez la page, acceptez les cookies pour débloquer l'interface |
| Flux figé | Cliquez sur "Arrêter" puis "Mettre à jour" pour relancer |

## 📋 À savoir

- Les flux HTTP/HTTPS peuvent être limités par les restrictions CORS
- Les flux NDI nécessitent une application NDI en cours d'exécution
- Les presets sont stockés localement et ne se synchronisent pas entre appareils
- La page refuse les cookies = pas d'accès à l'interface (par design RGPD)

---

**Besoin d'aide ?** Consultez aussi :
- [Gestionnaire de caméras](./CAMERAS.md)
- [Page couleur](./COLOR.md)
- [Écrans Minecraft](./SCREENS.md)
