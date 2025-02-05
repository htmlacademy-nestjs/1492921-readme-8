# Как работать над проектом

## Перейти в папку с проектом
```bash
cd ~/1492921-readme-8/project
```
## Установить зависимости
```bash
npm install
```
## Скопировать .env-example -> .env:

```bash
cp apps/account/.env-example apps/account/.env
cp apps/api/.env-example apps/api/.env
cp apps/blog/.env-example apps/blog/.env
cp apps/file-vault/.env-example apps/file-vault/.env
cp apps/notify/.env-example apps/notify/.env
```
## Docker
### Установить docker containers для сервиса аккаунтов (account)
```bash
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" --env-file ./apps/account/.env up -d
```
### Установить docker containers для сервиса блога (blog)
```bash
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog" --env-file ./apps/blog/.env up -d
```
### Установить docker containers для сервиса хранения файлов (file-vault)
```bash
docker compose --file ./apps/file-vault/file-vault.compose.dev.yml --project-name "readme-file-vault" --env-file ./apps/file-vault/.env up -d
```
### Установить docker containers для сервиса уведомлений (notify)
```bash
docker compose --file ./apps/notify/notify.compose.dev.yml --project-name "readme-notify" --env-file ./apps/notify/.env up -d
```
## DB Postgres
### Сгенерировать клиент Prisma
```bash
npx nx run blog:db:generate
```
### Сгенерировать и выполнить скрипт создания объектов в БД Postgres
```bash
npx nx run blog:db:migrate
```
## Запуск сервисов
```bash
npx nx run file-vault:serve
npx nx run notify:serve
npx nx run account:serve
npx nx run blog:serve
npx nx run api:serve
```
## Запуск Swagger 
### для тестирования end-point-ов приложения 
http://localhost:3000/spec#/

### для дополнительно тестирования end-point-ов отдельных микросервисов
The «Account» service
http://localhost:3333/spec#/
<br>
The «Blog» service
http://localhost:3334/spec#/       

