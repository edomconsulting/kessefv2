# Étape 1 : Construction avec Node 20
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Installation des dépendances
RUN npm install
COPY . .
# Construction du projet Next.js
RUN npm run build

# Étape 2 : Serveur de production
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
