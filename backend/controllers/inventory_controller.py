# controllers/inventory_controller.py
from fastapi import HTTPException
from db import inventory_collection   # assume you have a MongoDB collection like users_collection
from models.inventory_model import InventoryItem
from bson import ObjectId

async def add_inventory_item(item: InventoryItem):
    # Check if serial number already exists
    existing = await inventory_collection.find_one({"serial_number": item.serial_number})
    if existing:
        raise HTTPException(status_code=400, detail="Serial number already exists")

    # Insert into DB
    new_item = item.dict()
    result = await inventory_collection.insert_one(new_item)

    # Fetch inserted doc
    inserted = await inventory_collection.find_one({"_id": result.inserted_id})
    inserted["_id"] = str(inserted["_id"])  # ✅ stringify ObjectId

    return {
        "success": True,
        "message": "Item added successfully",
        "item": inserted
    }