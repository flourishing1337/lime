from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/admin/notes", tags=["admin"])

class Note(BaseModel):
    id: int
    title: str
    tag: str = "Quest"

# Fake-databas i minnet
notes_db: List[Note] = [
    Note(id=1, title="🔥 Uppgradera servern"),
    Note(id=2, title="✨ Nya API endpoints klara")
]

@router.get("/", response_model=List[Note])
def get_notes():
    return notes_db

@router.post("/", response_model=Note)
def add_note(note: Note):
    notes_db.append(note)
    return note
