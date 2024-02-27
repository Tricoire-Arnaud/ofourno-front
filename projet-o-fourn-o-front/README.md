# projet-o-fourn-o-front

## Utilisation de l'assistant d'installation

Vous pouvez utiliser l'assistant d'installation fourni avec ce modèle pour créer un nouveau projet ou pour copier les fichiers nécessaires dans un projet existant. Assurez-vous d'être dans le répertoire où vous souhaitez créer ou mettre à jour votre projet, puis lancez le script d'installation en suivant les étapes ci-dessous :

```sh
cd chemin/vers/votre/dossier_de_projet
# Assurez-vous que le script d'installation ait les autorisations d'exécution si nécessaire
./React-modele-vite/bin/install.sh
```

Suivez les instructions pour fournir le nom de votre nouveau projet ou l'adresse SSH d'un dépôt Git.

## Installation manuelle

Si vous préférez, vous pouvez également copier manuellement les fichiers nécessaires dans votre projet existant. Voici comment procéder :

```sh
# Assurez-vous d'être dans le répertoire de votre projet existant
cd chemin/vers/votre/projet

# Copiez les fichiers cachés et non-cachés ainsi que les dossiers src/, public/ et .vscode depuis le modèle
cp -n ../React-modele-vite/{.*,*} .
cp -rn ../React-modele-vite/{src,public,.vscode} .

# Installez les dépendances listées dans le fichier package.json
yarn
```

## Lancer le projet en mode développement

Une fois les fichiers copiés et les dépendances installées, vous pouvez lancer votre projet en mode développement en utilisant la commande suivante :

```sh
yarn dev
```

## Build du projet pour la production

Pour construire votre projet pour la production, vous pouvez exécuter la commande suivante :

```sh
yarn build
```

Cette commande va assembler, copier, nettoyer et minimiser votre code, produisant ainsi une version optimisée de votre projet dans le dossier `dist/`.

## Linting du code

Pour vérifier le style et la qualité de votre code, vous pouvez exécuter la commande suivante :

```sh
yarn lint
```

Cela utilisera ESLint pour vérifier les fichiers JavaScript et TypeScript dans le dossier `src/` et affichera les avertissements et les erreurs éventuels.

---

Assurez-vous d'adapter les chemins et les instructions en fonction de la configuration spécifique de votre projet.
```

Cela intègre également des instructions pour le linting du code, en utilisant ESLint avec les configurations fournies dans votre `package.json`. Cela aidera les utilisateurs à maintenir un code propre et conforme aux normes définies.
