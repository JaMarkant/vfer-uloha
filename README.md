# STROER Labs

**Nejedná se o hotovou práci! Dávám pouze k náhledu v jakém jsem stavu :)**

## Instalace

```shell
./build.sh
```

## Unit test

**Zatím nejsou všechny, ale jako proof of concept pár napsaných je.**
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