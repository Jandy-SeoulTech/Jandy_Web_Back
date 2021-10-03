FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g pm2
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run db:push
RUN npm run build

EXPOSE 4000

ENV NODE_ENV production
CMD ["pm2-runtime","./dist/index.js"]
