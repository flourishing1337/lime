from typing import List
import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.dependencies import get_db, get_current_admin
from backend.schemas.notes import NoteOut
from backend.crud.notes import get_all_notes

router = APIRouter(prefix="/admin/notes", tags=["admin"])

logger = logging.getLogger(__name__)

@router.get("/", response_model=List[NoteOut])
def read_notes(db: Session = Depends(get_db), current_admin=Depends(get_current_admin)):
    try:
        notes = get_all_notes(db)
        return notes
    except Exception as e:
        logger.exception("Fel vid hämtning av admin-notes")
        raise HTTPException(status_code=500, detail="Internt serverfel – se loggar")
