# Étape de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Utiliser --legacy-peer-deps si vous avez des conflits de versions
RUN npm install --legacy-peer-deps 
COPY . .
# Désactiver temporairement les erreurs de lint/type pour le build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build
