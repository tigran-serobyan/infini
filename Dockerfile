# Application container
FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env-docker ./.env

COPY . .

ENV PORT=80

CMD [ "npm", "start" ]