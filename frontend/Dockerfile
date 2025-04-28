FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-p", "3000", "-H", "0.0.0.0"]
