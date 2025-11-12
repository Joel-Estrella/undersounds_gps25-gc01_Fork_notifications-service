# Imagen para desarrollo con hot-reload
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Variables de entorno para DESARROLLO
ENV NODE_ENV=development
ENV PORT=3000

# Exponer el puerto
EXPOSE 3000

# Comando para desarrollo con hot-reload
CMD ["npm", "run", "dev"]