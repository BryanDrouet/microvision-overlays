# Guide d'utilisation

## Interface de base

### En-tête
- **Titre de la caméra** : Affiche la caméra sélectionnée
- **Statut en direct** : Cercle rouge = connecté, gris = déconnecté
- **Info du flux** : Type et résolution

### Zone vidéo principale
- Affiche l'iframe, vidéo, ou flux NDI
- Cliquez pour interagir (selon le type de flux)

## Configuration du flux

### 1. Saisir l'URL du flux

Exemples :

#### Twitch
```
https://player.twitch.tv/?channel=VOTRE_CHAÎNE&parent=localhost&muted=true
```

#### YouTube
```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1
```

#### Fichier vidéo local
```
http://localhost:8000/video.mp4
```

#### Stream RTMP (depuis serveur)
```
http://votre-serveur.com:8080/stream.m3u8
```

#### Lien direct MP4
```
https://example.com/videos/presentation.mp4
```

### 2. Choisir le type de flux

| Option | Cas d'usage |
|--------|------------|
| **Iframe Web** | Twitch, YouTube, pages web statiques |
| **Vidéo HTML5** | Fichiers MP4, HLS, WebM |
| **NDI** | Flux réseau OBS, serveurs NDI |
| **Canvas WebGL** | Rendu 3D, graphismes dynamiques |

### 3. Sélectionner la caméra

- 🎥 **Caméra Grue** - Pour plan large
- 📸 **Caméra Trépied** - Pour prise fixe
- 🎬 **Caméra Mobile** - Pour plan cinématique
- 🚁 **Caméra Drone** - Pour vue aérienne

Le choix de caméra est sauvegardé automatiquement.

### 4. Définir la qualité

- **Basse (360p)** : Pour faible débit
- **Moyenne (720p)** : Recommandée (défaut)
- **Haute (1080p)** : Pour connections stables
- **Ultra (4K)** : Rarement utile sur petits écrans

### 5. Cliquer "Mettre à jour"

Le flux se charge instantanément.

## Raccourcis caméras

Cliquez sur les boutons pour basculer rapidement :
- **Grue** → Caméra 1
- **Trépied** → Caméra 2
- **Mobile** → Caméra 3
- **Drone** → Caméra 4

Le dernier bouton cliqué reste actif.

## Presets

### Créer un preset

1. Configurez un flux complet (URL, type, caméra, qualité)
2. Cliquez **Ajouter un preset**
3. Entrez un nom mémorable
4. Le preset s'ajoute aux raccourcis

### Utiliser un preset

- Cliquez sur un preset pour charger instantanément sa configuration
- Les presets se chargent automatiquement

### Supprimer un preset

- Cliquez le **✕** (petit bouton en haut à droite du preset)
- La suppression est immédiate

### Exemples de presets

- "Grue HD Twitch"
- "Trépied vidéo promotionnelle"
- "Mobile plan rapproché"
- "Drone vue générale"

## Statistiques en temps réel

Affichées en bas de l'interface :

### 📡 Débit (Mbps)
- Vitesse de transfert du flux
- Idéalement > 2 Mbps pour 720p

### 🎬 FPS
- Images par seconde
- 30 fps = fluide, 60 fps = très fluide

### 📐 Résolution
- Taille actuelle : 360p, 720p, 1080p, 2160p (4K)

### ⏱️ Latence (ms)
- Délai de transmission
- < 100 ms = acceptable
- < 50 ms = très bon

## Intégration OBS Studio

### Ajouter le site comme source

1. **OBS Studio → Sources → +**
2. Choisir **BrowserSource**
3. **URL** : `https://USERNAME.github.io/microvision-overlays/`
4. Largeur : 1920, Hauteur : 1080
5. ✅ Valider

### Ou utiliser un flux NDI direct

1. Configurez le flux NDI dans l'interface
2. Dans OBS : **Sources → NDI Source**
3. Sélectionnez le flux
4. Intégrez-le dans votre composition

## Gestion des erreurs

### "En attente de connexion"

**Cause** : Pas de flux configuré ou consentement RGPD refusé

**Solution** :
- Entrez une URL valide
- Cliquez "Mettre à jour"
- Acceptez les cookies si demandé

### "Impossible de charger l'iframe"

**Cause** : Restriction CORS ou URL invalide

**Solution** :
- Vérifiez l'URL dans un nouvel onglet
- Testez avec une autre source (ex: YouTube)
- Utilisez un proxy si nécessaire

### Flux figé / noir

**Cause** : Problème réseau ou serveur

**Solution** :
- Cliquez "Arrêter" puis "Mettre à jour"
- Vérifiez votre connexion internet
- Essayez une autre URL

### Performance mauvaise

**Cause** : Qualité trop élevée ou trop de flux

**Solution** :
- Baissez la qualité (720p au lieu de 1080p)
- Fermez les autres applications
- Utilisez une vidéo pré-encodée au lieu de live

## Consentement RGPD

La banneau RGPD apparaît au premier accès :
- ✅ **Accepter** : Autorise l'utilisation des cookies techniques
- ❌ **Refuser** : Bloque la vidéo

Le choix est sauvegardé pour 30 jours.

## Raccourcis clavier

| Touche | Action |
|--------|--------|
| **Ctrl+Entrée** | Démarrer le flux |
| **Échap** | Arrêter le flux |

## Sauvegarde automatique

L'application sauvegarde automatiquement :
- Dernière caméra utilisée
- Tous les presets
- Consentement RGPD
- URLs des flux

Aucune action n'est nécessaire - tout est local.

## Cas d'usage courants

### Plateau TV multi-caméras

1. Créez 4 presets (un par caméra)
2. Basculez entre eux pendant l'émission
3. Chaque preset a son propre flux NDI
4. Intégrez les flux dans OBS

### Festival avec plans de coupe

1. Utilisez des raccourcis pour passer rapidement
2. Pré-encodez vos vidéos de présentation
3. Créez des presets "plan rapproché", "plan large", etc.
4. Déclenchez-les en direct depuis la régie

### Streaming Twitch avec OBS

1. Chargez cette interface dans OBS comme BrowserSource
2. Configurez le flux Twitch dans l'interface
3. OBS capture le lecteur Twitch
4. Vous le rediffusez vers Twitch (OK pour usage personnel)

### Spectateur NDI depuis PC distant

1. Machine A : Jeu Minecraft en spectateur
2. Machine B : OBS capture le flux NDI de A
3. Machine B : Intègre NDI dans OBS
4. WebDisplays Minecraft : URL de Machine B

## Optimisations

### Pour WebDisplays (petit écran)

- Utilisez 720p maximum
- Préférez les iframes statiques
- Réduisez les statistiques

### Pour OBS (capturage)

- Utilisez NDI pour latence faible
- Pré-encodez les vidéos
- Couplez avec un serveur local

### Pour live (débit limité)

- Baissez à 360p ou 480p
- Limitez les FPS à 24-30
- Compressez le flux en H.264

## Support

Consultez les autres fichiers de documentation :
- [Installation GitHub Pages](INSTALLATION.md)
- [Références API](API.md)

Problèmes ?
- Vérifiez votre connexion internet
- Testez l'URL dans un navigateur classique
- Consultez la console du navigateur (F12)
