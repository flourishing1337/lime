import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, checkout, admin

app = FastAPI(
    title="Lime API",
    description="Backend API för Lime-plattformen.",
    version="1.0.0"
)

# 🚀 Tillåt CORS så frontend kan anropa API:t
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Under utveckling tillåter vi alla, kan begränsas senare i produktion
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚀 Registrera routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(checkout.router, prefix="/checkout", tags=["Checkout"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

# 🚀 Extra: Version endpoint (valfri men bra för frontend)
@app.get("/version")
def get_version():
    return {"version": app.version}
