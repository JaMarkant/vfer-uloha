#!/bin/bash

cp ./api/.env.dist ./api/.env

docker compose build

#REVIEW: Why npm install, when it's done in docker file?
docker compose run api npm install

#REVIEW: Why force-recreate?
docker compose up --force-recreate
