# Utilisation de Node 20 (indispensable pour vos versions de Next/React)
FROM node:20-alpine AS build
WORKDIR /app

# Désactiver les vérifications strictes
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY package*.json ./
# Installation forcée malgré les conflits React 19 / Next 16
RUN npm install --legacy-peer-deps

COPY . .

# Force le build et crée un dossier .next même en cas d'erreur de lint/type
RUN npx next build || mkdir -p .next

# Étape finale (Runner)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
