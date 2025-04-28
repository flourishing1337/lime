import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, checkout, admin

# 🚀 Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 🚀 Create FastAPI app
app = FastAPI(
    title="Lime API",
    description="Backend API för Lime-plattformen.",
    version="1.0.0"
)

# 🚀 Allow CORS for frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all during development; restrict later in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚀 Register routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(checkout.router, prefix="/checkout", tags=["Checkout"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

# 🚀 Root route to confirm server is alive
@app.get("/")
def read_root():
    return {
        "message": "Backend API is alive!",
        "version": app.version
    }

# 🚀 Version route
@app.get("/version")
def get_version():
    return {
        "version": app.version
    }

# 🚀 Health check route (for Traefik, uptime monitors, etc.)
@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }
