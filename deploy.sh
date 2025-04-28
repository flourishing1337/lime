#!/bin/bash

set -e

echo "🔄 Pulling latest code from GitHub..."
git pull origin main

echo "🧹 Stopping and removing old containers..."
docker-compose down

echo "🔨 Building and starting fresh containers..."
docker-compose up -d --build

echo "✅ Deployment complete!"
