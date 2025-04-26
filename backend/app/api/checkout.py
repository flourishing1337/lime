from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.db.database import get_db

router = APIRouter()

class CheckoutRequest(BaseModel):
    total_amount: float
    guest_email: str | None = None
    guest_name: str | None = None
    guest_address: str | None = None

@router.post("/checkout")
def checkout(order: CheckoutRequest, db=Depends(get_db)):
    cursor = db.cursor()

    if not order.guest_email or not order.guest_name or not order.guest_address:
        raise HTTPException(status_code=400, detail="Guest info missing")

    cursor.execute(
        "INSERT INTO orders (guest_email, guest_name, guest_address, total_amount) VALUES (%s, %s, %s, %s) RETURNING id",
        (order.guest_email, order.guest_name, order.guest_address, order.total_amount)
    )
    new_order_id = cursor.fetchone()[0]
    db.commit()

    return {"order_id": new_order_id}
