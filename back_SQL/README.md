# Interest - Backend

Interest est un réseau social basé sur les centres d'intérêt, permettant aux utilisateurs de se connecter et d'échanger selon leurs passions communes.

## Technologies utilisées

- **Base de données** : Le backend utilise à la fois une base de données SQL et NoSQL pour stocker les données.
- **Serveur local** : Utilisation d'un serveur web local pour tester et exécuter l'application (ex : XAMPP, WAMP, etc.).

## Prérequis

1. **Cloner le projet** :
   Pour cloner le dépôt, exécutez la commande suivante :
   ```bash
   git clone <URL-du-dépôt>
## Configuration de l'environnement

2. **Installer les dépendances** :
   Avant de configurer la base de données, assurez-vous d'installer toutes les dépendances du projet en exécutant la commande suivante :
   ```bash
   npm i
2. **Après avoir cloné le projet**, créez un fichier `.env` en vous basant sur le fichier `.example.env`. Complétez ensuite les valeurs en fonction de votre environnement de travail (ex : accès à la base de données, clés API, etc.).

3. **Configurer la base de données** :
   Une fois le fichier `.env` correctement configuré, vous devez générer et migrer les modèles Prisma vers la base de données. Pour cela, exécutez les commandes suivantes :
   ```bash
   npx prisma generate 
   npx prisma migrate dev
4. **Lancer le serveur ** :
Une fois la base de données configurée, vous pouvez lancer le serveur backend en mode développement avec la commande suivante :
```bash
	npm run start:dev
