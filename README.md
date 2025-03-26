# React_PixelWar

## Nécessaire à installer pour pouvoir tester le projet

docker
docker-compose
node >= v20
npm

## Lancer le back en local

Allez dans le dossier pixel-war-back
Renommez le .env.example en .env

Ouvrez un terminal à cet emplacement
Lancez ```docker-compose up --build```

Si "Serveur en écoute sur le port 3000" s'affiche, tout devrait être bon
Si ce n'est pas le cas, vérifiez que rien d'autre n'utilise le port 3000, ou alors modifiez le docker-compose.yml pour changer le port sur lequel écoute docker ainsi que le port après localhost dans config.json du projet front

## Lancer le front en local

Allez dans le dossier pixel-war-front

Ouvre un terminal à cet emplacement
```npm install```
```npm run build```
Puis ```npm run preview```

Cliquez sur l'url local donné par le terminal

## Tester les web sockets

Ouvrez une fenêtre sur une navigateur
Ouvrez une fenêtre sur un autre navigateur ou en navigation privée
Placez des pixels et vérifiez la synchronisation

## Utilisateurs présents de base

De base, deux utilisateurs sont présents à la création de la BDD : 
- login : "user1@example.com" ou "user2@example.com"
- mdp : "password"
Vous pouvez vous connecter à leur compte ou créer un nouveau compte pour commencer à placer des pixels