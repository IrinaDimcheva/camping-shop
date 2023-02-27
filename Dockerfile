FROM node:14-alpine AS builder

ARG REACT_APP_REST_API_URL

# Add a work directory
WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app/

RUN npm build

FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder /app/dist .

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
