FROM node

CMD mkdir -p /app
WORKDIR /app
COPY . /app
COPY /package.json /app
RUN npm install

EXPOSE 3000

CMD cd /app && npm start
