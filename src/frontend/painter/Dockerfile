FROM node:13.12.0-alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN apk add --no-cache git
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 4201

CMD ["npm", "start"]
