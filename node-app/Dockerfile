FROM node:latest as node
WORKDIR /src
COPY package.json ./
#RUN npm install
COPY . .
EXPOSE 3000
CMD npm run start.dev
#CMD [ "npm", "run","start.dev" ]
