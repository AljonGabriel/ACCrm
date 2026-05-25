# controllers/inventory_controller.py
from fastapi import HTTPException
from db import inventory_collection   # assume you have a MongoDB collection like users_collection
from models.inventory_model import InventoryItem
from bson import ObjectId
from datetime import datetime

async def add_inventory_item(item: InventoryItem):
    # Check if serial number already exists
    existing = await inventory_collection.find_one({"serial_number": item.serial_number})
    if existing:
        raise HTTPException(status_code=400, detail="Serial number already exists")

    # Insert into DB
    new_item = item.dict()

    # ✅ Always set today's date automatically
    new_item["date_added"] = datetime.today().strftime("%Y-%m-%d")

    result = await inventory_collection.insert_one(new_item)

    # Fetch inserted doc
    inserted = await inventory_collection.find_one({"_id": result.inserted_id})
    inserted["_id"] = str(inserted["_id"])  # stringify ObjectId

    return {
        "success": True,
        "message": "Item added successfully",
        "item": inserted
    }

# Controller function: handles DB logic
async def list_inventory_items():
    items_cursor = inventory_collection.find({})
    items = []
    async for item in items_cursor:
        item["_id"] = str(item["_id"])  # ✅ stringify ObjectId
        items.append(item)

    # Group items by category
    grouped = {}
    for item in items:
        category = item.get("category", "Uncategorized")
        grouped.setdefault(category, []).append(item)

    return {"items": items, "grouped": grouped}


async def update_inventory_item(item_id: str, update_data: dict):
    # Convert string ID to ObjectId
    try:
        oid = ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid item ID")

    # If status is Defective, auto-populate defective_date
    if update_data.get("status") == "Defective":
        update_data["defective_date"] = datetime.today().strftime("%Y-%m-%d")
        # defective_issue should come from frontend form
        if "defective_issue" not in update_data:
            raise HTTPException(status_code=400, detail="Defective issue description required")

    # Perform update
    result = await inventory_collection.update_one(
        {"_id": oid},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")

    # Fetch updated document
    updated = await inventory_collection.find_one({"_id": oid})
    updated["_id"] = str(updated["_id"])  # stringify ObjectId

    return {"success": True, "message": "Item updated successfully", "item": updated}

async def delete_inventory_item(item_id: str):
    try:
        oid = ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid item ID")

    result = await inventory_collection.delete_one({"_id": oid})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")

    return {"success": True, "message": "Item deleted successfully"}
