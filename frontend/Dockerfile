# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS builder

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build --prod

# Etapa 2: Servir la aplicación Angular
FROM nginx:alpine

# Copia los archivos de construcción de la etapa anterior
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Expone el puerto en el que Nginx escucha
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
