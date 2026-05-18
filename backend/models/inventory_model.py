# models/inventory_model.py
from pydantic import BaseModel

class InventoryItem(BaseModel):
    item_name: str
    serial_number: str
    status: str
    stock: int
    endorsed: str
