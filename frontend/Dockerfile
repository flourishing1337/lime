FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

# build-time / run-time variables
ARG VITE_API_BASE
ARG JWT_SECRET
ENV VITE_API_BASE=$VITE_API_BASE \
    JWT_SECRET=$JWT_SECRET

# Build the Svelte-Kit site
RUN npm run build

# Lightweight static server
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
