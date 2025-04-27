from sqlalchemy import Column, Integer, String
from backend.database import Base  # Säkerställ att du importerar din declarative Base korrekt

class AdminNote(Base):
    __tablename__ = "admin_notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
