# Écrans Géants - Tests Dynamiques

## 🎯 Objectif

Tester l'affichage sur des écrans géants sans que le contenu ne dépasse jamais des bords. Le contenu s'adapte **dynamiquement** à n'importe quelle résolution.

## 📁 Structure

```
microvision-overlays/
├── css/
│   ├── main.css              ← Styles communs (une seule façon de faire)
│   ├── main-screen.css       ← Couleurs Main Screen
│   ├── first-floor.css       ← Couleurs First Floor
│   └── second-floor.css      ← Couleurs Second Floor
├── js/
│   └── shared.js             ← Horloge + Résolution (réutilisé)
├── pages/
│   ├── main-screen.html      ← Page Main Screen
│   ├── first-floor.html      ← Page First Floor
│   └── second-floor.html     ← Page Second Floor
└── README.md
```

## ✅ Garanties

✔️ **Rien ne dépasse** - Tout reste dans le cadre (overflow: hidden)
✔️ **100% Dynamique** - Utilise `vw/vh` et `clamp()`, pas de tailles fixes
✔️ **Responsive** - Change de taille sans casser
✔️ **Une seule méthode** - CSS réutilisé partout, pas 36 façons de faire
✔️ **Harmonisé** - `main.css` unique + CSS couleurs par écran

## 📍 Informations Affichées

| Position | Contenu |
|----------|---------|
| 🔝 Haut gauche | Nom de l'écran + Résolution en direct |
| 🔙 Bas gauche | Heure + Date (actualisées chaque seconde) |

## 🚀 Utilisation

```bash
# Ouvrir dans un navigateur (F11 pour fullscreen)
pages/main-screen.html      # 3800 × 2200 px
pages/first-floor.html      # 4200 × 1200 px
pages/second-floor.html     # 1600 × 600 px
```

**Resize ou fullscreen** - Tout s'adapte !

## 🎨 Personnalisation

**Changer les couleurs** → Modifiez `css/main-screen.css`, `css/first-floor.css`, `css/second-floor.css`

**Modifier la mise en page** → Modifiez `css/main.css` (s'applique à tous)

**Ajouter un nouvel écran** → Dupliquez une page HTML + créez un `css/new-screen.css`

## 🛠️ Comment ça marche

- `clamp(min, preferré, max)` = Taille fluide sans CSS media queries
- `100vw/vh` = Occupe tout l'écran, toujours
- `overflow: hidden` = Rien ne peut dépasser
- `.screen` = Conteneur qui s'adapte en permanence
