# Contexte de build : racine du repo (lockfile npm workspaces à la racine)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci -w backend
COPY backend backend
RUN npm run build -w backend

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci -w backend --omit=dev

FROM node:22-alpine
ENV NODE_ENV=production PORT=3000
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY backend/package.json ./backend/
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["node", "backend/dist/server.js"]
