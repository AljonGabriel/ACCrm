# routes/inventory_routes.py
from fastapi import APIRouter
from controllers.inventory_controller import add_inventory_item, list_inventory_items, update_inventory_item
from models.inventory_model import InventoryItem

router = APIRouter()

@router.post("/add")
async def add_item(item: InventoryItem):
    return await add_inventory_item(item)

@router.get("/list")
async def get_inventory_items():
    return await list_inventory_items()

@router.put("/update/{item_id}")
async def update_item(item_id: str, update_data: dict):
    return await update_inventory_item(item_id, update_data)