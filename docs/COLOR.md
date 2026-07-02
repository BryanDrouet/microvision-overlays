# 🎨 Page d'affichage de couleur

## Description

La **Page couleur** (`/color/`) affiche une couleur unie ou un dégradé en fullscreen, idéale pour des écrans de transition, backgrounds personnalisés, ou intégration dans des WebDisplays Minecraft.

## 🚀 Accès

```
https://microvision-overlays.bryan.ovh/color/
```

## 🎨 Modes d'affichage

### 1. **Couleur unie**

Affiche une seule couleur en fullscreen.

**Paramètre URL :**
```
?color=RRGGBB
```

**Exemples :**

| Couleur | URL |
|---------|-----|
| 🔴 Rouge | `?color=FF0000` |
| 🟢 Vert | `?color=00FF00` |
| 🔵 Bleu | `?color=0000FF` |
| ⚫ Noir | `?color=000000` |
| ⚪ Blanc | `?color=FFFFFF` |
| 💛 Jaune | `?color=FFFF00` |

**Format flexible :**
- Avec `#` : `?color=%23FF0000` (encodé en URL)
- Sans `#` : `?color=FF0000`
- Format court (3 chiffres) : `?color=F00` → `#FF0000`

### 2. **Dégradé linéaire**

Affiche un dégradé entre deux couleurs.

**Paramètre URL :**
```
?gradient=COLOR1,COLOR2[,ANGLE]
```

**Exemples :**

| Gradient | URL |
|----------|-----|
| Bleu → Cyan | `?gradient=0000FF,00FFFF` |
| Rose → Rouge | `?gradient=FF69B4,FF0000,45` |
| Vert → Bleu (vertical) | `?gradient=00FF00,0000FF,90` |
| Magenta → Jaune (horizontal) | `?gradient=FF00FF,FFFF00,0` |
| Arc-en-ciel | `?gradient=FF0000,00FF00,120` |

**Angle (optionnel) :**
- `0°` : Horizontal (gauche → droite)
- `45°` : Diagonal (défaut)
- `90°` : Vertical (haut → bas)
- `180°` : Horizontal inversé
- `270°` : Vertical inversée

### 3. **Couleur par défaut**

Si aucun paramètre n'est fourni :
```
https://microvision-overlays.bryan.ovh/color/
```

Affiche **gris** (`#808080`)

## 🔗 Liens directs

Voici des liens prêts à l'emploi :

### Couleurs pures
- [🔴 Rouge](https://microvision-overlays.bryan.ovh/color/?color=FF0000)
- [🟢 Vert](https://microvision-overlays.bryan.ovh/color/?color=00FF00)
- [🔵 Bleu](https://microvision-overlays.bryan.ovh/color/?color=0000FF)
- [💛 Jaune](https://microvision-overlays.bryan.ovh/color/?color=FFFF00)
- [⚫ Noir](https://microvision-overlays.bryan.ovh/color/?color=000000)
- [⚪ Blanc](https://microvision-overlays.bryan.ovh/color/?color=FFFFFF)

### Dégradés
- [Bleu → Cyan](https://microvision-overlays.bryan.ovh/color/?gradient=0000FF,00FFFF)
- [Rose → Bleu](https://microvision-overlays.bryan.ovh/color/?gradient=FF1493,1E90FF)
- [Vert → Bleu vertical](https://microvision-overlays.bryan.ovh/color/?gradient=00FF00,0000FF,90)
- [Feu (orange→rouge)](https://microvision-overlays.bryan.ovh/color/?gradient=FF8C00,FF0000,90)

## 📱 Responsive

L'affichage s'adapte à tous les écrans :
- ✅ Desktop (1920x1080)
- ✅ Tablette (1366x768)
- ✅ Mobile (1280x720)
- ✅ Ultra-large (3840x2160)
- ✅ Minecraft WebDisplay (288x1080, 1920x532, 1907x1080)

## 🎮 Intégration Minecraft WebDisplays

Utilisation dans les WebDisplays du mod Minecraft :

### Couleur simple (écran rouge)
```
https://microvision-overlays.bryan.ovh/color/?color=FF0000
```

### Dégradé (éclairage de scène)
```
https://microvision-overlays.bryan.ovh/color/?gradient=FFD700,FF8C00,45
```

### Transition progressive
```
# BlueScreen
https://microvision-overlays.bryan.ovh/color/?color=0000FF

# Écran de fond
https://microvision-overlays.bryan.ovh/color/?color=1A1A2E

# Highlight lighting
https://microvision-overlays.bryan.ovh/color/?gradient=00FF00,00FFFF,90
```

## 🛠️ Utilisation avancée

### Générer des URLs avec JavaScript

```javascript
// Générer une URL de couleur
function generateColorUrl(color) {
  return `https://microvision-overlays.bryan.ovh/color/?color=${color}`;
}

// Générer une URL de dégradé
function generateGradientUrl(color1, color2, angle = 45) {
  return `https://microvision-overlays.bryan.ovh/color/?gradient=${color1},${color2},${angle}`;
}

// Utilisation
const redUrl = generateColorUrl('FF0000');
const gradientUrl = generateGradientUrl('FF1493', '1E90FF', 90);

console.log(redUrl);
console.log(gradientUrl);
```

### Depuis OBS (Browser Source)

1. Créer une nouvelle source **Browser**
2. Définir l'URL :
   ```
   https://microvision-overlays.bryan.ovh/color/?color=00FF00
   ```
3. Dimensions : 1920x1080 (ou votre résolution)
4. Cliquer sur le bouton de rafraîchissement

### Depuis des WebDisplays Minecraft

```bash
# Exemple: afficher une couleur dans un écran WebDisplay
/wd seturl ECRAN_ID https://microvision-overlays.bryan.ovh/color/?gradient=FF0000,00FF00,0
```

## 🎨 Codes couleur courants

| Couleur | Code | Hex | RGB |
|---------|------|-----|-----|
| 🔴 Rouge | FF0000 | #FF0000 | rgb(255, 0, 0) |
| 🟢 Vert | 00FF00 | #00FF00 | rgb(0, 255, 0) |
| 🔵 Bleu | 0000FF | #0000FF | rgb(0, 0, 255) |
| 💛 Jaune | FFFF00 | #FFFF00 | rgb(255, 255, 0) |
| 🩵 Cyan | 00FFFF | #00FFFF | rgb(0, 255, 255) |
| 🩷 Magenta | FF00FF | #FF00FF | rgb(255, 0, 255) |
| ⚫ Noir | 000000 | #000000 | rgb(0, 0, 0) |
| ⚪ Blanc | FFFFFF | #FFFFFF | rgb(255, 255, 255) |
| 🩶 Gris | 808080 | #808080 | rgb(128, 128, 128) |
| 🟠 Orange | FF8C00 | #FF8C00 | rgb(255, 140, 0) |
| 🟣 Violet | 800080 | #800080 | rgb(128, 0, 128) |

## ⚙️ Validation des couleurs

Le système valide automatiquement les entrées :

| Format | Exemple | ✅ Valide |
|--------|---------|-----------|
| 6 chiffres | FF0000 | ✅ |
| Avec # | #FF0000 | ✅ |
| 3 chiffres | F00 | ✅ (→ FF0000) |
| Invalide | GGGGGG | ❌ → Gris par défaut |
| Invalide | FF00 | ❌ → Gris par défaut |

## 🔄 Comportement en cas d'erreur

Si la couleur ou le gradient est invalide :
- **Par défaut** : Affiche gris (`#808080`)
- **Console** : Message d'avertissement avec le détail de l'erreur
- **Interface** : Pas de message visible (graceful degradation)

## 📊 Cas d'utilisation

### Écrans de transition
```
Avant vidéo : ?color=000000 (noir)
Après vidéo : ?color=FFFFFF (blanc)
```

### Théâtre/Performance
```
Rideau rouge : ?gradient=FF0000,8B0000,0
Spotlight : ?color=FFFF00
```

### Signalisation
```
🟢 En ligne : ?color=00FF00
🔴 Hors ligne : ?color=FF0000
🟡 En attente : ?color=FFFF00
```

### Studio OBS
```
Écran vert : ?color=00FF00
Chroma key bleu : ?color=0000FF
```

## 🐛 Dépannage

| Problème | Solution |
|----------|----------|
| Écran gris | Vérifiez votre code couleur (6 chiffres hex) |
| Dégradé inversé | Changez l'angle (0, 45, 90, 180, etc.) |
| Couleur n'apparaît pas | Actualisez la page (F5) |
| Lien ne fonctionne pas | Assurez-vous que le domaine est accessible |

## 💡 Astuces

- 📋 Copiez les URLs directement dans vos favoris
- 🎨 Utilisez un [sélecteur de couleur](https://htmlcolorcodes.com) pour générer les codes
- 🔗 Créez des presets avec des URLs personnalisées
- 📱 Testez sur mobile avant de déployer sur Minecraft

---

**Besoin d'aide ?** Consultez aussi :
- [Studio Principal](./STUDIO.md)
- [Gestionnaire de caméras](./CAMERAS.md)
- [Écrans Minecraft](./SCREENS.md)
