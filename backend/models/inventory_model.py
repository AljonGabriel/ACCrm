# models/inventory_model.py
from pydantic import BaseModel

class InventoryItem(BaseModel):
    category: str
    item_name: str
    serial_number: str
    status: str
    stock: int
    endorsed: str
