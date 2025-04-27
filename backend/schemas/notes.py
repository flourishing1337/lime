from pydantic import BaseModel

class NoteOut(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        orm_mode = True
