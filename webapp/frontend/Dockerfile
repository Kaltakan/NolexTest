# Usa un'immagine base di Node.js per la build
FROM node:18 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file del frontend
COPY . .

# Installa le dipendenze e costruisci l'app React
RUN npm install && npm run build

# Usa un server web leggero per servire l'app
FROM nginx:alpine

# Copia i file della build nel server Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Esponi la porta 80 per il traffico HTTP
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]
