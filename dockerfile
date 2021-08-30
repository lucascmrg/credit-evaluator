FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "run", "prestart:prod", "start:prod"]
