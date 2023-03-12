FROM node:latest as node
WORKDIR /src_api
COPY package.json ./
#RUN npm install
COPY . .
EXPOSE 6000
CMD npm run start.prod
#CMD [ "npm", "run","start.prod" ]

#for error nodemon
#sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p
#error docker
#sudo service docker restart
