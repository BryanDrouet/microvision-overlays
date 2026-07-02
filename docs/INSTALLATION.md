# Guide d'installation GitHub Pages

## Prérequis

- Compte GitHub (gratuit)
- Git installé sur votre ordinateur
- Un navigateur web

## Étape 1 : Préparer votre machine

### Windows

1. **Installer Git** :
   - Téléchargez : https://git-scm.com/download/win
   - Installez avec les options par défaut

2. **Configurer Git** (PowerShell ou CMD) :
   ```powershell
   git config --global user.name "Votre Nom"
   git config --global user.email "votre.email@example.com"
   ```

### Mac/Linux

```bash
brew install git  # Mac
sudo apt install git  # Linux

git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

## Étape 2 : Créer un dépôt GitHub

1. Allez sur https://github.com/new
2. **Repository name** : `microvision-overlays` (ou votre choix)
3. **Description** : "Interface vidéo pour WebDisplays et OBS Studio"
4. ✅ **Public**
5. ❌ **Ne cochez PAS** "Add README" (vous en avez déjà un)
6. Cliquez **Create repository**

## Étape 3 : Pousser votre code

### Dans PowerShell/Terminal

```powershell
# Allez au dossier du projet
cd C:\Users\Administrateur\Desktop\Autre\microvision-overlays\microvision-overlays

# Initialisez le dépôt
git init

# Ajoutez tous les fichiers
git add .

# Créez un commit
git commit -m "Initial commit: Studio interface for WebDisplays and OBS"

# Renommez la branche en 'main' si nécessaire
git branch -M main

# Ajoutez l'origine (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/microvision-overlays.git

# Poussez le code
git push -u origin main
```

**Vous serez demandé de vous authentifier** :
- Utilisateur : Votre nom d'utilisateur GitHub
- Mot de passe : Un Personal Access Token (voir ci-dessous)

### Créer un Personal Access Token

1. Allez sur https://github.com/settings/tokens
2. Cliquez **Generate new token**
3. Cochez ✅ **repo** (accès complet au dépôt)
4. Définissez l'expiration : **90 jours** ou plus
5. Cliquez **Generate token**
6. **Copiez le token** (ne le montrez à personne !)
7. Utilisez ce token comme mot de passe dans Git

## Étape 4 : Activer GitHub Pages

### Méthode 1 : Via l'interface web

1. Allez sur https://github.com/USERNAME/microvision-overlays
2. Cliquez l'onglet **Settings**
3. Dans le menu de gauche, cliquez **Pages**
4. Sous "Build and deployment" :
   - **Source** : Sélectionnez "Deploy from a branch"
   - **Branch** : Sélectionnez "main" et "/root"
5. Cliquez **Save**
6. Attendez 1-2 minutes

### Méthode 2 : Vérifier le déploiement

1. Allez sur **Actions** dans votre dépôt
2. Attendez que la build soit verte ✅
3. Retournez à **Settings → Pages**
4. Vous verrez : "Your site is live at..."

## Étape 5 : Accéder à votre site

Votre site est maintenant disponible à :
```
https://USERNAME.github.io/microvision-overlays/
```

Remplacez `USERNAME` par votre nom d'utilisateur GitHub.

## Étape 6 : Intégrer dans Minecraft WebDisplays

1. **Créez un écran WebDisplays** dans votre monde Minecraft
2. **Cliquez dessus** et entrez l'URL :
   ```
   https://USERNAME.github.io/microvision-overlays/
   ```
3. **Validez** et le site chargera !

## Mettre à jour le site

Après avoir modifié les fichiers :

```powershell
git add .
git commit -m "Mise à jour: description de vos changements"
git push
```

Le site se mettra à jour automatiquement en 30 secondes.

## Configurations avancées

### CNAME personnalisé (domaine)

Si vous avez un domaine personnalisé :

1. Créez un fichier `CNAME` à la racine (sans extension)
2. Écrivez votre domaine :
   ```
   studio.votredomaine.com
   ```
3. Configurez vos DNS (chez votre registraire)
4. GitHub fera le reste

### Branche de production différente

Par défaut, GitHub Pages utilise `main`. Si vous préférez une branche `gh-pages` :

```bash
git branch gh-pages
git push -u origin gh-pages
```

Puis activez `gh-pages` dans Settings → Pages.

## Dépannage

### Le site n'apparaît pas après 5 minutes

- Vérifiez que la branche correcte est sélectionnée dans Settings
- Allez sur l'onglet **Actions** - y a-t-il une erreur ?
- Attendez que la build soit verte ✅

### 404 - Page non trouvée

- Vérifiez l'URL : `https://USERNAME.github.io/microvision-overlays/`
- Vérifiez que `index.html` existe à la racine
- Videz le cache du navigateur (Ctrl+Shift+Suppr)

### CORS - Erreur "Cross-Origin"

Certains flux externes peuvent être bloqués :
- Les iframes Twitch/YouTube fonctionnent généralement
- Pour les autres, déployez un proxy local ou utilisez NDI

## Après le déploiement

- ✅ Testez chaque caméra (cam1, cam2, cam3, cam4)
- ✅ Testez les presets
- ✅ Vérifiez les statistiques en direct
- ✅ Testez avec OBS Studio
- ✅ Optimisez les flux selon vos besoins

## Support

Besoin d'aide ?

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Communauté WebDisplays](https://www.curseforge.com/minecraft/mods/webdisplays)
- Issues du dépôt GitHub
