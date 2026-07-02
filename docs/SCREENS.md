# 📺 Écrans Minecraft WebDisplays

## Description

Les **Écrans** (`/main-screen/`, `/first-floor/`, `/second-floor/`) sont des pages fullscreen optimisées pour affichage sur les WebDisplays du mod Minecraft. Elles affichent :
- **Titre** de l'écran
- **Résolution** détectée en temps réel
- **Heure & Date** actualisées automatiquement

## 🚀 Accès

| Écran | URL |
|-------|-----|
| Principal | `https://microvision-overlays.bryan.ovh/main-screen/` |
| Rez-de-chaussée | `https://microvision-overlays.bryan.ovh/first-floor/` |
| Premier étage | `https://microvision-overlays.bryan.ovh/second-floor/` |

## 🎮 Configuration dans Minecraft

### 1. Installation du mod WebDisplay

1. Installez le mod **WebDisplays** pour Minecraft
2. Placez un écran WebDisplay dans votre monde
3. Faites clic-droit → Configurer

### 2. Ajouter une page

Configuration pour chaque écran :

```
URL: https://microvision-overlays.bryan.ovh/main-screen/
Dimension de l'écran: 1907x1080 (ou adaptez à votre résolution)
Zoom: 100%
```

### 3. Paramètres recommandés

| Écran | Résolution | Recommandation |
|-------|-----------|-----------------|
| **Main Screen** | 1907x1080 | Grand écran central |
| **First Floor** | 1920x532 | Écran panoramique horizontal |
| **Second Floor** | 288x1080 | Écran vertical étroit |

## 📊 Affichage

### Disposition

```
┌─────────────────────────────┐
│  ┌─ HEADER (coin haut-gauche)
│  │ [MAIN SCREEN]
│  │ 1907x1080
│  └─
│                              
│  [CONTENU CENTRAL]          
│  Affiche le titre de l'écran
│                              
│  ┌─ FOOTER (coin bas-gauche)
│  │ 14:30:45
│  │ 03 07 2026
│  └─
└─────────────────────────────┘
```

### Éléments

1. **Header** (coin haut-gauche)
   - Nom de l'écran
   - Résolution détectée
   - Fond semi-transparent
   - Bordure blanche

2. **Contenu central**
   - Titre centré et agrandi
   - Comportement responsive
   - Se redimensionne selon la taille de l'écran

3. **Footer** (coin bas-gauche)
   - Heure actuelle (HH:MM:SS)
   - Date (DD MM YYYY)
   - Fond semi-transparent
   - Bordure blanche

## 🎨 Personnalisation

### Dégradés de fond

Chaque écran a son propre dégradé :

| Écran | Dégradé | Couleurs |
|-------|---------|----------|
| **Main Screen** | Vertical | 🟣 Violet → 🟣 Violet foncé |
| **First Floor** | Horizontal | 🩷 Rose → 🔴 Rouge |
| **Second Floor** | Diagonal | 🔵 Bleu → 🔵 Cyan |

**Modifier les dégradés :**

Éditez `/css/[screen-name].css` :

```css
/* Main Screen - Gradient Original */
body {
    background: linear-gradient(0deg, #8400FC, #27014B);
    background-attachment: fixed;
}
```

### Polices et tailles

Les tailles de police s'adaptent automatiquement (CSS clamp) :

```css
/* Responsive */
.content h1 {
    font-size: clamp(50px, 12vw, 120px);
}

.header-info {
    font-size: clamp(16px, 2.2vw, 36px);
}
```

## ⚙️ Fonctionnalités

### Mise à jour en temps réel

L'heure et la date se mettent à jour automatiquement toutes les secondes via `shared.js` :

```javascript
// Code dans shared.js
setInterval(updateTime, 1000);
```

### Détection de résolution

La résolution affichée se met à jour automatiquement lors du redimensionnement :

```javascript
window.addEventListener('resize', () => {
    updateResolution();
});
```

### Responsive Design

Les éléments s'adaptent aux écrans de toutes tailles :
- ✅ Ultra-petit (288x1080)
- ✅ Horizontal (1920x532)
- ✅ Standard (1907x1080)
- ✅ Ultra-large (3840x2160)

## 🔗 Liens directs aux fichiers

- [main-screen/index.html](../main-screen/index.html)
- [first-floor/index.html](../first-floor/index.html)
- [second-floor/index.html](../second-floor/index.html)
- [css/main.css](../css/main.css) (styles partagés)
- [js/shared.js](../js/shared.js) (horloge & résolution)

## 📝 Contenu du fichier HTML

### Structure commune

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Main Screen</title>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/main-screen.css">
</head>
<body data-screen-name="Main Screen">
    <div class="screen">
        <!-- Header -->
        <div class="header-info">
            <div class="screen-name">MAIN SCREEN</div>
            <div class="screen-resolution" id="screen-resolution">-</div>
        </div>

        <!-- Contenu -->
        <div class="content">
            <h1>MAIN SCREEN</h1>
        </div>

        <!-- Footer -->
        <div class="footer-info">
            <div class="time" id="current-time">--:--:--</div>
            <div class="date" id="current-date">--</div>
        </div>
    </div>

    <script src="../js/shared.js"></script>
</body>
</html>
```

## 💾 Stockage

Ces pages ne stockent aucune donnée dans `localStorage`. L'affichage est **statique et complètement responsive**.

## 🎬 Cas d'utilisation

### Studio avec plusieurs écrans

1. **Main Screen** (1907x1080)
   - Écran central principal
   - Affichage de contenu statique ou dynamique

2. **First Floor** (1920x532)
   - Écran de contrôle horizontal en bas
   - Bande d'information en temps réel

3. **Second Floor** (288x1080)
   - Écran vertical étroit sur le côté
   - Informations complémentaires

### Exemple Minecraft setup

```
Studio principale:
├── 1 × Main Screen (1907x1080)
├── 1 × First Floor (1920x532)
└── 2 × Second Floor (288x1080 chacun)
```

## 🎨 Personnalisation avancée

### Ajouter du contenu personnalisé

1. Éditez `/main-screen/index.html` (ou autre écran)
2. Modifiez le contenu dans `<div class="content">`

Exemple - Ajouter des informations :
```html
<div class="content">
    <h1>MAIN SCREEN</h1>
    <p id="custom-info">Status: EN LIGNE</p>
</div>
```

### Ajouter un script personnalisé

```html
<script src="../js/shared.js"></script>
<script>
    // Votre code personnalisé
    document.getElementById('custom-info').textContent = 'Status: ' + new Date().toLocaleTimeString();
</script>
```

### Modifier les couleurs

Éditez `/css/[screen-name].css` :

```css
body {
    /* Changez le gradient */
    background: linear-gradient(0deg, #FF0000, #00FF00);
}
```

## 🐛 Dépannage

| Problème | Solution |
|----------|----------|
| Heure ne s'affiche pas | Vérifiez que `shared.js` est chargé |
| Résolution affiche "-" | Attendez le chargement, ou rechargez la page |
| Dégradé ne s'affiche pas | Vérifiez le fichier CSS spécifique à l'écran |
| Texte trop grand/petit | Ajustez les tailles dans le CSS avec `clamp()` |
| Écran figé | Rafraîchissez la page (F5) |

## 📊 Variables CSS disponibles

Dans `/css/main.css` :

```css
/* Tailles responsives */
.screen-name {
    font-size: clamp(16px, 2.2vw, 36px);
}

.content h1 {
    font-size: clamp(50px, 12vw, 120px);
}

.header-info, .footer-info {
    padding: clamp(12px, 1.8vw, 24px);
}
```

## 🎯 Recommandations

✅ **Bonnes pratiques:**
- Gardez le design simple pour la lisibilité à distance
- Testez sur mobile avant sur les WebDisplays
- Utilisez des couleurs contrastées (texte blanc sur fond foncé)
- Limitez le nombre d'éléments pour les petits écrans

❌ **À éviter:**
- Animations lourdes ou vidéos (ralentissement Minecraft)
- Contenu interactif complexe
- Texte trop petit ou trop grand
- Images haute résolution sans optimisation

---

**Besoin d'aide ?** Consultez aussi :
- [Studio Principal](./STUDIO.md)
- [Gestionnaire de caméras](./CAMERAS.md)
- [Page couleur](./COLOR.md)
