# frontend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application pour la production
RUN npm run build -- --output-path=dist --configuration=production

# Étape de production : serveur NGINX
FROM nginx:alpine

# Copier les fichiers construits dans le dossier servi par NGINX
COPY --from=builder /app/dist/browser /usr/share/nginx/html

# Copier une configuration NGINX personnalisée (optionnelle)
# Nous allons utiliser la configuration par défaut, suffisante ici.
# Si besoin plus tard, on pourra ajouter un fichier nginx.conf.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]