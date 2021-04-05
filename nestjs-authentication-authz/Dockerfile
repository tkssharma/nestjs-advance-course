FROM node:carbon
WORKDIR /usr/src/app
ARG GIT_TOKEN

COPY .npmrc ./
COPY package.json package-lock.json ./
RUN npm install
RUN rm -f .npmrc

# Add your source files
COPY . .
EXPOSE 3000
RUN npm run build
cmd npm run start:dev
