# Stage 1: Build React Application
FROM node:20 AS build

# Установка рабочей директории
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Stage 2: Serve React Application with Nginx
FROM nginx:stable-alpine

# Копируем собранное приложение из стадии сборки
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]