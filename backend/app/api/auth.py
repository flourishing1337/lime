from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel
from app.core.security import create_access_token, verify_password, get_password_hash
from app.db.database import get_db
import psycopg2

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: UserCreate, db=Depends(get_db)):
    cursor = db.cursor()

    # Kontrollera om användaren redan finns
    cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Skapa ny användare
    password_hash = get_password_hash(user.password)
    cursor.execute(
        "INSERT INTO users (email, password_hash) VALUES (%s, %s) RETURNING id",
        (user.email, password_hash)
    )
    db.commit()

    return {"msg": "User created"}

@router.post("/login")
def login(user: UserCreate, response: Response, db=Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id, password_hash FROM users WHERE email = %s", (user.email,))
    db_user = cursor.fetchone()

    if not db_user or not verify_password(user.password, db_user[1]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    response.set_cookie(key="auth_token", value=token, httponly=True)
    return {"msg": "Login successful"}
