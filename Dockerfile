FROM node:18.16.0

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

ENV SERVICE_NAME='food api service'
ENV SECRET_KEY=sdkfsdf9iuj3erfds9i
ENV DB_HOST=127.0.0.1
ENV DB_PORT=27017
ENV DB_USER=test
ENV DB_PASS=""
ENV DB_NAME=foodstore

ENV FRONTEND_URL=http://localhost:5000

ENV FRONTEND_URL="http://localhost:5000"

EXPOSE 3000

CMD [ "npm","start" ]
