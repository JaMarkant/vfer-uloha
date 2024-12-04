#!/bin/bash

cp ./api/.env.dist ./api/.env

docker compose build

docker compose run api npm install

docker compose up --force-recreate