## Beer Finder Application

### Beer Finder API
The api is a restful express api which communicates with Punk API `(https://api.punkapi.com/documentation/v2)` to retrieve beer data.
It also implements caching using `memory-cache (https://www.npmjs.com/package/memory-cache)` 
and a `nosql (https://www.npmjs.com/package/nosql)` file based database.

### Beer Finder Client
It is a webfornt end written in vue js.

### Running locally

#### Run with docker

To run the application using docker and make, at the root of the project run

```bash
make run-local-development
```

alternatively run 

```bash
docker-compose up
```

> Note it might take few minutes for docker to build and run the application. 

Access the frontend at: `http://localhost:8080`
Access the api at: `http://localhost:4000`
Access the api documentation at: `http://localhost:4000/api`

#### Run on local machine

1. To run the frontend:
```bash
cd client
npm i
npm run serve
```

Access the frontend at `http://localhost:8080`

2. To run the api
```bash
cd server
npm i 
npm run start:dev
```

### Running tests

1. Frontend:
```bash
cd client
npm i
npm run test:unit
```

2. Api
```bash
cd server
npm i
npm run test
```