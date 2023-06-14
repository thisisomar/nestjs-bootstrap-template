## Description

This is a template I created to use for my projects. It uses Nest.js and integrates Passport with Sessions. It uses MikroORM (PostgreSQL) and Redis for the session aspect. The whole point is to ensure this template follows best practices 

## Installation

```bash
$ npm install
```

## Running the app

Make sure you have Docker installed. Simply run this command to spin up the redis and postgres containers:

```bash
# Execute this command, it'll run the containers in the background 
$ docker-compose up -d
```

Then you can run the Nest.js API!

```bash
# development
$ npm run start:dev
```

## To-do

Things I should do (and plan to do) to make this better
- [ ] Implement a consistent error handling system (be considerate of GraphQL conventions)
- [ ] Use pino for logging
- [ ] Setup environment variables
- [ ] Setup a testing suite