from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.user import User  # Anpassa detta till din user-modell
from backend.security import verify_password, create_access_token  # Vi skapar dessa om du inte har dem ännu

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str

@router.post("/register", status_code=201)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email används redan.")

    hashed_password = hash_password(data.password)

    new_user = User(
        email=data.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": str(new_user.id)})

    return {"access_token": access_token}

class TokenResponse(BaseModel):
    access_token: str

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Felaktig email eller lösenord.")

    # 👉 Här lägger vi in både id och email i token
    access_token = create_access_token(data={"sub": str(user.id), "email": user.email})

    return {"access_token": access_token}
