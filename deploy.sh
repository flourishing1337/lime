#!/bin/bash

echo "🔄 Pulling latest code..."
git pull origin main

echo "🔨 Building Docker containers..."
docker-compose down
docker-compose up -d --build

echo "✅ Deployment complete!"
