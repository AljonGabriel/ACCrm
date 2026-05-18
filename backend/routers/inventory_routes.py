# routes/inventory_routes.py
from fastapi import APIRouter
from controllers.inventory_controller import add_inventory_item
from models.inventory_model import InventoryItem

router = APIRouter()

@router.post("/add")
async def add_item(item: InventoryItem):
    return await add_inventory_item(item)

