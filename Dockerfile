FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src/*.js .

EXPOSE 8080

ENV STAGE=prod

CMD [ "node", "./index.js" ]
