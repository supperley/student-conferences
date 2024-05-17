# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий с клиентским приложением по ссылке https://github.com/supperley/student-conferences.git

```
git clone https://github.com/supperley/student-conferences.git
```

2. Склонировать репозиторий с api по ссылке [https://github.com/supperley/student-conferences-api.git](https://github.com/supperley/student-conferences-api)

```
git clone https://github.com/supperley/student-conferences-api.git
```

3. Открыть терминал (или командную строку) и перейти в корневую директорию сервера.

```
cd express-threads-api
```

4. Переименовать файл .env.local (убрать .local)

```
.env
```

5. Запустить команду docker compose, которая поднимет сервер, клиент и базу данных

```
docker compose up
```

6. Открыть браузер и перейти по адресу http://localhost:80, чтобы увидеть запущенный проект.

# Если вы хотите скачать образ базы данных MongoDB

Запустите контейнер с образом MongoDB:

```
  docker run --name mongodb \
       -p 27017:27017 \
       -e MONGO_INITDB_ROOT_USERNAME="root" \
       -e MONGO_INITDB_ROOT_PASSWORD="root" \
       mongodb/mongodb-community-server
```
