FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g pm2
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

ENV NODE_ENV production
CMD ["pm2-runtime","./dist/index.js"]
