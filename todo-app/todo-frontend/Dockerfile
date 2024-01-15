FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

ENV REACT_APP_BACKEND_URL=http://localhost:3000

EXPOSE 3000

CMD ["npm", "start"]
