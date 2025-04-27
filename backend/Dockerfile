# backend/Dockerfile

FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

# 🛠 Ladda ner wait-for och gör det körbart
RUN apt-get update && apt-get install -y curl && \
    curl -o /usr/local/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/master/wait-for && \
    chmod +x /usr/local/bin/wait-for

# Startkommandot lägger vi till senare i docker-compose
