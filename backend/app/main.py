from fastapi import FastAPI
from app.api import auth, checkout, admin

app = FastAPI()

app.include_router(auth.router, prefix="/auth")
app.include_router(checkout.router)
app.include_router(admin.router)
