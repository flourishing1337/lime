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

RUN npm run build

EXPOSE 3000
CMD ["node", "build"]   # ← runs the actual SvelteKit server!
