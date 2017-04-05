FROM node

CMD mkdir -p /app
WORKDIR /app
ADD /code/package.json /app
CMD cd /app
CMD npm install
COPY . /app
EXPOSE 3000

CMD cd code && npm start
