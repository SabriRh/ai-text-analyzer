# Contexte de build : racine du repo (lockfile npm workspaces à la racine)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci -w frontend
COPY frontend frontend
RUN npm run build -w frontend -- --configuration=production

FROM nginx:1.27-alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
