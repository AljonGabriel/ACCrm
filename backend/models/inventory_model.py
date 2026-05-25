from typing import Optional
from pydantic import BaseModel

class InventoryItem(BaseModel):
    category: str
    item_name: str
    serial_number: str
    status: str
    stock: int
    endorsed: str
    defective_date: Optional[str] = None
    defective_issue: Optional[str] = None


# Separate model for updates (all optional)
class InventoryUpdate(BaseModel):
    category: Optional[str] = None
    item_name: Optional[str] = None
    serial_number: Optional[str] = None
    status: Optional[str] = None
    stock: Optional[int] = None
    endorsed: Optional[str] = None
    defective_date: Optional[str] = None
    defective_issue: Optional[str] = None
