# STROER Labs

**Dávám zatím k náhledu úlohu č.1 :)**

## Instalace

```shell
./build.sh
```

## Unit test

```shell
docker compose exec api npm run test
```

## Manuální test
```shell
curl -X GET http://localhost:3000/count
```
Mělo by vrátit "Count not found".

```shell
curl -X POST -H 'Content-Type: application/json' -d '{ "count": 8,"body":"bar", "id": 1 }' http://localhost:3000/track
curl -X GET http://localhost:3000/count
```
Mělo by vrátit 8, protože v těle requestu je "count": 8.