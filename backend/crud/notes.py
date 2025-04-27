from sqlalchemy.orm import Session

from backend.models.admin_notes import AdminNote  # Anpassa om modellen ligger i annan fil

def get_all_notes(db: Session):
    return db.query(AdminNote).all()
