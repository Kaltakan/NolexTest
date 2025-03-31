# Fase di build
FROM node:16 AS build

# Imposta la cartella di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file del progetto
COPY . .

# Costruisce l'app React per la produzione
RUN npm run build

# Fase finale
FROM nginx:alpine

# Copia i file di build da React nella cartella di Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80

# Avvia Nginx per servire l'app React
CMD ["nginx", "-g", "daemon off;"]
