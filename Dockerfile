FROM node:16.13.2

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY ["package.json", "package-lock.json", "client/package.json", "client/package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]