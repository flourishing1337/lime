from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/admin/messages", tags=["admin"])

class Message(BaseModel):
    id: int
    user: str
    text: str

# Fake-databas i minnet
messages_db: List[Message] = [
    Message(id=1, user="Lucas", text="Vi deployade precis!"),
    Message(id=2, user="Du", text="Nice, jag testar!")
]

@router.get("/", response_model=List[Message])
def get_messages():
    return messages_db

@router.post("/", response_model=Message)
def add_message(message: Message):
    messages_db.append(message)
    return message
