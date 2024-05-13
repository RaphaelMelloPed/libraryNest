FROM node:18.17.1

COPY . .

COPY ./ package*.json  

RUN npm i -g nodemon

WORKDIR /usr/scr/app/backend

EXPOSE 3031

CMD ["npm", "start","npm","test:watch"]