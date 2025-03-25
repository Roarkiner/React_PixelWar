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