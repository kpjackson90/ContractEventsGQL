FROM node:14.18-alpine3.14 

WORKDIR '/usr/src/app/src'

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]

