FROM node:16.13.2

ENV PORT=3000

WORKDIR /app

COPY [ "package.json", "package-lock.json", "./" ]
COPY [ "client/package.json", "client/package-lock.json", "./client/" ]

RUN npm ci && \
    npm ci --prefix client

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]