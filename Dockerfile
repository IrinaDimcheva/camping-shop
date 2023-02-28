############ Build Stage ############

FROM node:18.14.2-alpine AS builder

WORKDIR /app

ADD . /app

RUN npm install

RUN npm run build

############ Serve Stage ############

FROM caddy:alpine

COPY --from=builder /app/build /srv

COPY Caddyfile /etc/caddy/Caddyfile