<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# NestJS Contacts API

This project uses [@nestjsx/crud](https://github.com/nestjsx/crud) to simplify and standardize the REST API

This backend is based on NestJS Framework V6 (https://nestjs.com/), This is API Backend for POC on event driven UI using Sockets and NgRx

- DB: Mysql
- Nestjs
- TypeORM
- Websockets: Socket.io


**Frontend is available here: https://github.com/tkssharma/ng-dashboard-training**

##  @nestjs features used in this application 

- Midldeare 
- pipes
- controllers
- services
- dynamic modules 
- guards
- configModule
- Database Module
- Entity Module
- Logger Module
- Swagger Module 
  

## Env VARS: (create a .env file in root)
```bash
ENV=development
DB_TYPE=mysql
PORT=3000
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=test
MYSQL_DB_HOST=db
MYSQL_DB_PORT=3306
DB_DIALECT=mysql
DB_CHARSET=utf8mb4
DB_COLLATE=utf8mb4_unicode_ci

```

## Run

```bash
cp env.example .env
```

```bash
docker-compose up --build 
```

```bash
services:
  node:
    build: .
    volumes:
      - ./docker/node/node-docker-entrypoint.sh:/usr/local/bin/docker-entrypoint.sh
      - .:/app
    env_file:
      ./.env
```      


Server will be running on http://localhost:3000

# Endpoints

```bash
node_1   | socket initialized
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RoutesResolver] AppController {/}: +726ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/, GET} route +6ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RoutesResolver] ContactsController {/contacts}: +3ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/, GET} route +4ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/:id, GET} route +3ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/, POST} route +4ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/bulk, POST} route +5ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/:id, PATCH} route +4ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [RouterExplorer] Mapped {/:id, DELETE} route +2ms
node_1   | [Nest] 48   - 04/06/2020, 1:39 PM   [NestApplication] Nest application successfully started +7ms
node_1   | SERVER IS RUNNING ON PORT 3000
```

## Installation

```bash
$ npm install
```

## Running the app with debugger
```json
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "node --inspect=0.0.0.0:5858 -r ts-node/register ./src/main.ts"
}

```


```bash
# development
$ npm run build
$ npm run debug
$ docker-compose up

# watch mode
$ npm run start

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

