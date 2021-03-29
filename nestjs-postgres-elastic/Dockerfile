FROM node:12-buster-slim

WORKDIR /app

COPY package*.json  /app/

RUN npm install && \
    rm -rf /tmp/* /var/tmp/*

COPY ./docker-utils/entrypoint/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

COPY . /app

RUN npm run build

EXPOSE 3000

USER node

ENV TYPEORM_MIGRATION=ENABLE
ENV NPM_INSTALL=DISABLE

CMD npm run start:prod