# Task Manager

Simple task app made with React, Express and SQLite.

## Features

* Add task
* Edit task
* Delete task
* Complete / uncomplete task
* Tasks are saved in SQLite

## Tech

* React
* Vite
* Axios
* Node.js
* Express
* SQLite

## Run

### Server

```bash
cd server
npm install
npm run dev
```

Runs on `http://localhost:5000`

### Client

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`

## API

```text
GET     /api/tasks
GET     /api/tasks/:id
POST    /api/tasks
PUT     /api/tasks/:id
PATCH   /api/tasks/:id/complete
DELETE  /api/tasks/:id
```

The database is created automatically when the server starts.

No login/authentication. It's just a local app.
