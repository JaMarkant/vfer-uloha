FROM node:22.12.0-alpine

RUN apk add bash

WORKDIR /app

COPY . .

RUN npm install -g typescript ts-node @nestjs/cli

RUN npm install

EXPOSE 3000

# REVIEW: Proč se tady nastavuje uživatel?
# USER node

CMD npm run start:dev
