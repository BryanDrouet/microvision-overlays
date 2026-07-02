# MicroVision Overlays - Studio Vidéo pour WebDisplays

Interface professionnelle de diffusion vidéo pour intégration WebDisplays Minecraft et OBS Studio.

## 📊 Configuration des écrans WebDisplays

- **Main Screen** : 21x12 blocs → 1907x1080 px
- **First Floor** : 21x6 blocs → 1920x532 px  
- **Second Floor** : 3x8 blocs → 288x1080 px

## 🚀 Démarrage rapide

### Déploiement sur GitHub Pages

1. **Créer un dépôt GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Studio interface for WebDisplays"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/microvision-overlays.git
   git push -u origin main
   ```

2. **Activer GitHub Pages** :
   - Settings → Pages
   - Sélectionnez "main" comme branche
   - Sauvegardez

3. **Votre URL** :
   ```
   https://YOUR_USERNAME.github.io/microvision-overlays/
   ```

### Utiliser dans WebDisplays

Entrez cette URL dans votre écran WebDisplays :
```
https://YOUR_USERNAME.github.io/microvision-overlays/
```

## 📚 Fichiers

- **index.html** - Interface principale (4 caméras, stats en temps réel)
- **style.css** - Design professionnel avec thème sombre
- **app.js** - Logique JavaScript (presets, consentement RGPD, statistiques)
- **config.json** - Configuration des flux et caméras
- **.gitignore** - Configuration Git

## 🎥 Types de flux supportés

| Type | Latence | Cas d'usage |
|------|---------|------------|
| **Iframe** | Élevée | Twitch, YouTube, pages web |
| **Vidéo HTML5** | Faible | MP4, HLS, fichiers locaux |
| **NDI** | Très faible | OBS, serveurs réseau |
| **Canvas WebGL** | Très faible | Rendu 3D, graphismes |

## 🎬 Caméras et presets

### Caméras configurées

- 🎥 **Caméra Grue** (Cam 1) - Vue principale haute
- 📸 **Caméra Trépied** (Cam 2) - Vue fixe stable
- 🎬 **Caméra Mobile** (Cam 3) - Vue dynamique
- 🚁 **Caméra Drone** (Cam 4) - Vue aérienne

### Créer des presets

1. Configurez un flux (URL, type, qualité)
2. Cliquez "Ajouter un preset"
3. Donnez-lui un nom
4. Cliquez sur le preset pour l'utiliser instantanément

## 🔧 Configuration

### Paramètres URL

Pré-remplissez les champs avec des paramètres :

```
https://YOUR_USERNAME.github.io/microvision-overlays/?camera=cam1&type=iframe&quality=high&url=https://...
```

Paramètres :
- `camera` : cam1, cam2, cam3, cam4
- `type` : iframe, video, ndi, canvas
- `quality` : low (360p), medium (720p), high (1080p), ultra (4K)
- `url` : URL du flux (URL-encodée)

### Personnalisation

Modifiez `config.json` pour :
- Renommer les caméras
- Ajouter de nouveaux types de flux
- Changer les qualités par défaut
- Ajouter des flux d'exemple

## 💡 Cas d'usage

### OBS Studio

1. Capturez le flux NDI depuis votre serveur
2. Intégrez-le dans OBS via NDI (plugin NDI)
3. Mélangez-le avec d'autres sources

### Serveur loué + PC local

**Solution recommandée par demini** :

```
PC Local (Jeu principal)
    ↓
Deuxième PC (Mode spectateur)
    ↓
NDI vers OBS
    ↓
OBS transcode → Page web
    ↓
WebDisplays Minecraft
```

### Multiple caméras

Créez plusieurs instances :
- `?camera=cam1` pour Grue
- `?camera=cam2` pour Trépied
- `?camera=cam3` pour Mobile
- `?camera=cam4` pour Drone

## 📊 Statistiques en temps réel

L'application affiche :
- 📡 Débit (Mbps)
- 🎬 FPS
- 📐 Résolution
- ⏱️ Latence (ms)

## ⌨️ Raccourcis clavier

- `Ctrl+Entrée` - Démarrer le flux
- `Échap` - Arrêter le flux
- `Maj+S` - Basculer les stats (implémentation future)

## 🛠️ Troubleshooting

### Le flux ne charge pas
- ✅ Vérifiez l'URL
- ✅ Vérifiez les règles CORS
- ✅ Testez dans un navigateur d'abord

### Problèmes de performance
- Baissez la qualité
- Utilisez des vidéos pré-encodées
- Fermez les onglets inutilisés

### NDI ne fonctionne pas
- Serveur NDI actif ?
- Permissions réseau correctes ?
- Plugin NDI installé ?

## 🤝 Intégration avec les mods Minecraft

### Create (Grue motorisée)
```
Construisez une grue avec rotors et pilotez la caméra
```

### Supplementaries (Trépieds)
```
Placez des trépieds décoratifs avec CustomModelData
```

### Easy NPC / Armor Statues
```
Modélisez des caméras 3D et assignez-les à des objets
```

## 📝 Licence

MIT License - Utilisez librement, modifiez à volonté

## 🔗 Ressources utiles

- [Documentation WebDisplays](https://www.curseforge.com/minecraft/mods/webdisplays)
- [GitHub Pages](https://pages.github.com/)
- [NDI Protocol](https://www.ndi.tv/)
- [MCEF (Chromium Minecraft)](https://www.curseforge.com/minecraft/mods/mcef)

## 📞 Support

Pour toute question ou amélioration :
- Consultez les issues GitHub
- Participez aux discussions
- Contribuez avec des pull requests