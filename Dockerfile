FROM node:5.10.1

WORKDIR /usr/local/src

COPY package.json /usr/local/src
RUN npm install

COPY . /usr/local/src
