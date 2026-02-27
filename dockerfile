FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Installation en ignorant les conflits de dépendances
RUN npm install --legacy-peer-deps
COPY . .

# IGNORER LES ERREURS DE LINT ET TYPESCRIPT PENDANT LE BUILD
ENV NEXT_TELEMETRY_DISABLED 1
ENV ESLINT_NO_DEV_ERRORS 1
ENV DISABLE_ESLINT_PLUGIN true

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
