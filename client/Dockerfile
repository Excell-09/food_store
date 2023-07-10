FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV VITE_BACKEND_URL="http://localhost:3000"

EXPOSE 5000

CMD [ "npm","run","dev" ]
