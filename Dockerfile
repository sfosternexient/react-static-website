#Here we will use node as the base image.
FROM node:14.21.1-alpine AS builder

#create a working directory inside the container.
WORKDIR /app

#Environment variables.
ENV PATH /app/node_modules/.bin:$PATH

#copy the files from the host to the container.
COPY package.json ./
COPY package-lock.json ./

#install npm and react versions.
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

#install nodemon to provide hot-reloading functionality.
RUN npm install nodemon --save-dev
COPY . ./

RUN npm install

#use nodemon to run the react application using npm.
#CMD ["nodemon", "--exec", "npm", "start"]


FROM builder AS lint
#lint 
RUN npm install lint
#RUN npx lint install:hooks
RUN npm lint


FROM builder AS compiler
#compile
#RUN
CMD ["nodemon", "--exec", "npm", "start"]


FROM builder AS unittests
#run unit test
RUN npm test
#fix with json


FROM builder AS build
#build container
#make tag variable updated by pipeline
RUN docker build -t dev2:tag .

FROM builder AS start
#start a container
#RUN docker run dev2
#CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true

FROM builder AS stop
#stop a container
RUN docker stop dev2

FROM builder AS remove
#remove a container
RUN docker rm dev2