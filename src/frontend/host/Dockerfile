FROM node:13.12.0-alpine as builder

COPY . /app

WORKDIR /app

RUN npm install && npm run build


FROM nginx:alpine

WORKDIR /etc/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
