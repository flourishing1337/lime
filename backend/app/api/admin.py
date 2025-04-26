from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from app.db.database import get_db
from pydantic import BaseModel
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploaded_files"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

class NoteCreate(BaseModel):
    title: str
    content: str

@router.post("/admin/files/upload")
def upload_file(
    file: UploadFile = File(...),
    uploader_email: str = Form(...),
    db=Depends(get_db)
):
    file_location = f"{UPLOAD_FOLDER}/{file.filename}"
    
    with open(file_location, "wb+") as f:
        shutil.copyfileobj(file.file, f)

    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO admin_files (filename, file_url, uploader_email, file_type) VALUES (%s, %s, %s, %s) RETURNING id",
        (file.filename, f"/files/{file.filename}", uploader_email, file.content_type)
    )
    db.commit()

    return {"message": "File uploaded successfully"}

@router.get("/admin/files")
def list_files(db=Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id, filename, file_url, uploader_email, file_type, created_at FROM admin_files ORDER BY created_at DESC")
    files = cursor.fetchall()
    return {"files": files}

@router.post("/admin/notes")
def create_or_update_note(note: NoteCreate, db=Depends(get_db)):
    cursor = db.cursor()

    # Radera gammal note om titel redan finns
    cursor.execute("DELETE FROM admin_notes WHERE title = %s", (note.title,))
    cursor.execute(
        "INSERT INTO admin_notes (title, content) VALUES (%s, %s)",
        (note.title, note.content)
    )
    db.commit()
    return {"message": "Note saved"}

@router.get("/admin/notes")
def get_notes(db=Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id, title, content, created_at, updated_at FROM admin_notes ORDER BY created_at DESC")
    notes = cursor.fetchall()
    return {"notes": notes}
