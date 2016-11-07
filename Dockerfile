FROM node:7.0.0
MAINTAINER william.melani@live.com
RUN npm install -g yarn
COPY . /src
WORKDIR /src
RUN yarn install
WORKDIR /src/web
RUN yarn install
RUN npm rebuild node-sass
RUN node ./node_modules/webpack/bin/webpack.js
EXPOSE 3069
WORKDIR /src
CMD ["npm", "start"]
