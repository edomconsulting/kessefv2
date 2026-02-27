# Build React
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve avec Nginx
FROM nginx:stable-alpine
# Vérifiez si votre dossier de build s'appelle 'build' ou 'dist'
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
