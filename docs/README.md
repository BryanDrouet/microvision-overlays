# 📚 Documentation MicroVision Overlays

Bienvenue dans la documentation complète de **MicroVision Overlays** ! Cette suite d'outils permet de gérer des flux vidéo en direct et des affichages pour Minecraft WebDisplays.

## 📖 Pages de documentation

Choisissez la page qui vous intéresse :

### 🎬 [Studio Principal](./STUDIO.md)
L'**interface de contrôle principale** pour charger et gérer les flux vidéo en direct.

- Configuration des flux (URL, type, qualité)
- Raccourcis caméras
- Système de presets
- Statistiques en temps réel
- Gestion du consentement RGPD

**Accès :** https://microvision-overlays.bryan.ovh/

---

### 🎥 [Gestionnaire de caméras](./CAMERAS.md)
Espace **CRUD complet** pour configurer vos caméras et leurs flux.

- Ajouter/modifier/supprimer des caméras
- Import/export de configurations
- Gestion des métadonnées (ID, nom, emoji, description)
- Charger rapidement une caméra

**Accès :** https://microvision-overlays.bryan.ovh/cameras/

---

### 🎨 [Page couleur](./COLOR.md)
Affichage **fullscreen de couleurs et dégradés** via paramètres URL.

- Couleurs unies (mode standard)
- Dégradés linéaires configurables
- Parfait pour Minecraft WebDisplays
- Zéro configuration requise

**Accès :** https://microvision-overlays.bryan.ovh/color/

---

### 📺 [Écrans Minecraft](./SCREENS.md)
Pages **fullscreen optimisées** pour WebDisplays Minecraft avec horloge en temps réel.

- 3 écrans principaux (Main Screen, First Floor, Second Floor)
- Affichage de l'heure et de la date
- Détection de résolution
- Design responsive

**Accès :**
- https://microvision-overlays.bryan.ovh/main-screen/
- https://microvision-overlays.bryan.ovh/first-floor/
- https://microvision-overlays.bryan.ovh/second-floor/

---

## 🗺️ Carte d'utilisation

```
MicroVision Overlays
│
├── 📺 Accueil / Studio Principal (index.html)
│   ├── Charger un flux vidéo
│   ├── Gérer les caméras → 🎥 (cameras/index.html)
│   └── Voir les statistiques
│
├── 🎥 Gestionnaire de caméras (cameras/index.html)
│   ├── Ajouter/Modifier/Supprimer caméras
│   ├── Import/Export configurations
│   └── Retour au Studio → 📺
│
├── 🎨 Page couleur (color/index.html)
│   ├── Afficher une couleur unie
│   └── Afficher un dégradé
│
└── 📺 Écrans Minecraft (main-screen/, first-floor/, second-floor/)
    ├── Main Screen (1907x1080)
    ├── First Floor (1920x532)
    └── Second Floor (288x1080)
```

---

## 🚀 Démarrage rapide

### 1️⃣ Accédez à l'interface studio

```
https://microvision-overlays.bryan.ovh/
```

### 2️⃣ Acceptez les cookies RGPD

La première visite affiche un banneau de consentement. Cliquez sur **"Accepter"**.

### 3️⃣ Chargez un flux

- Entrez une **URL de flux** (Twitch, YouTube, NDI, etc.)
- Sélectionnez le **type de flux**
- Choisissez une **qualité**
- Cliquez sur **"Mettre à jour"**

### 4️⃣ Explorez les autres pages

- **Gestionnaire caméras** : Configurez vos caméras
- **Page couleur** : Affichez des couleurs/dégradés
- **Écrans** : Visualisez les pages Minecraft

---

## 💾 Données sauvegardées

L'application utilise `localStorage` pour persister les données :

| Donnée | Clé | Durée |
|--------|-----|-------|
| Presets de flux | `stream_presets` | Permanent |
| Caméras | `stream_cameras` | Permanent |
| Dernière caméra | `last_camera` | Permanent |
| Consentement RGPD | `rgpd_consent` | Permanent |

**Aucune donnée n'est envoyée à un serveur externe.** Tout est stocké localement.

---

## 🔧 Intégrations

### OBS Studio

Utilisez les pages en tant que **Browser Sources** :

```
URL: https://microvision-overlays.bryan.ovh/color/?color=00FF00
Dimensions: 1920x1080
Zoom: 100%
```

### Minecraft WebDisplays

Intégrez directement dans vos écrans :

```
https://microvision-overlays.bryan.ovh/main-screen/
https://microvision-overlays.bryan.ovh/color/?gradient=FF0000,00FF00
```

### Twitch / YouTube

Injectez les flux depuis vos streamers favoris :

```
Type: Iframe Web
URL: https://www.twitch.tv/embed/USERNAME/chat?parent=microvision-overlays.bryan.ovh
```

---

## 🎨 Personnalisation

### Ajouter une caméra personnalisée

1. Allez sur le [Gestionnaire de caméras](./CAMERAS.md)
2. Remplissez le formulaire "Ajouter une nouvelle caméra"
3. Entrez l'URL de votre flux
4. Enregistrez

### Créer une URL de couleur personnalisée

```
https://microvision-overlays.bryan.ovh/color/?color=RRGGBB
```

Exemples :
- Rouge : `?color=FF0000`
- Dégradé bleu-cyan : `?gradient=0000FF,00FFFF`

### Modifier les écrans Minecraft

Les fichiers peuvent être personnalisés :
- `/css/main.css` - Styles partagés
- `/css/[screen-name].css` - Dégradés spécifiques
- `/js/shared.js` - Horloge et résolution

---

## 🐛 Dépannage

### Le flux ne s'affiche pas

1. Vérifiez que l'URL est **correcte et accessible**
2. Vérifiez le **type de flux** sélectionné
3. Vérifiez les **permissions CORS** (certains flux HTTP peuvent être bloqués)
4. Essayez une autre source de test

### Les cookies sont refusés

- Rechargez la page
- Cliquez sur **"Accepter les cookies"** pour débloquer l'interface

### Les données ne se sauvegardent pas

1. Vérifiez que `localStorage` est **activé**
2. Vérifiez l'**espace disque** disponible
3. Essayez de **vider le cache** du navigateur

### Minecraft WebDisplay vide

1. Vérifiez que l'URL est **correcte** (pas de typo)
2. Testez l'URL dans votre navigateur d'abord
3. Vérifiez les **permissions d'accès au domaine**

---

## 📊 Spécifications techniques

### Stack
- **Frontend** : HTML5, CSS3, JavaScript vanilla (ES6+)
- **Stockage** : localStorage (~5-10 Mo disponible)
- **Icônes** : Lucide Icons (CDN)
- **Hébergement** : GitHub Pages

### Navigateurs supportés
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Mobile browsers (limité pour certains flux)

### Résolutions d'écran supportées
- ✅ Ultra-mobile (320px+)
- ✅ Mobile (480px+)
- ✅ Tablette (768px+)
- ✅ Desktop (1024px+)
- ✅ Ultra-large (4K+)

### WebDisplay Minecraft
- ✅ Main Screen (1907x1080)
- ✅ First Floor (1920x532)
- ✅ Second Floor (288x1080)

---

## 📞 Support et contribution

### Questions ?

Consultez la documentation appropriée :
- [Studio Principal](./STUDIO.md)
- [Gestionnaire de caméras](./CAMERAS.md)
- [Page couleur](./COLOR.md)
- [Écrans Minecraft](./SCREENS.md)

### Bugs ou améliorations ?

Signalez les problèmes via :
- GitHub Issues : https://github.com/BryanDrouet/microvision-overlays/issues
- Email : contactez le développeur

---

## 📜 Licence

Ce projet est disponible sur GitHub : [microvision-overlays](https://github.com/BryanDrouet/microvision-overlays)

---

## 🎉 Bon usage !

Profitez de **MicroVision Overlays** pour créer des expériences visuelles incroyables ! 

N'hésitez pas à explorer les fonctionnalités et à personnaliser selon vos besoins.

**Dernière mise à jour :** Juillet 2026
