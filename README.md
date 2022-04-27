![Heroku](https://heroku-badge.herokuapp.com/?app=aggdetector&root=dashboard/app)

# Agglomeration Detector Service

## Local development

### Prerequisites

* Node 14

### 1 - Create `.env` files in `backend` and `frontend` folders.

#### `backend/.env`

```
NODE_ENV=development
DATABASE=mongodb+srv://<username>:<password>@aggdetector.myxhh.mongodb.net/aggdetector?retryWrites=true&w=majority
DATABASE_USERNAME=<username>
DATABASE_PASSWORD=<password>
PORT=3000
JWT_SECRET=celeste
JWT_COOKIE_EXPIRES_IN=3600
JWT_EXPIRES_IN=90d
```

#### `frontend/.env`

```
REACT_APP_IP_ADDRESS=localhost:3000
```

### 2 - Start backend

```
npm run dev
```

### 3 - Start frontend

```
npm start
```
