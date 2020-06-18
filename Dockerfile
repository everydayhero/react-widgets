FROM node:10

WORKDIR /usr/local/src

COPY package.json /usr/local/src
RUN npm install
RUN npm install react@^15.6.2 react-dom@^15.6.2 hero-ui@^5.8.10

COPY . /usr/local/src
