# backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copier le reste du code source
COPY . .

# Compiler TypeScript vers JavaScript
RUN npm run build

# Étape de production : image plus légère
FROM node:20-alpine

WORKDIR /app

# Copier les modules et le code compilé
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Variable d'environnement par défaut (peut être surchargée)
ENV PORT=3000
ENV OLLAMA_URL=http://ollama:11434/v1

# Exposer le port
EXPOSE 3000

# Lancer le serveur
CMD ["node", "dist/server.js"]