from fastapi import HTTPException
from db import knowledge_base_collection   
from models.kb_model import KnowledgeBase
from bson import ObjectId
from datetime import datetime

async def add_kb_entry(entry: KnowledgeBase):
    entry_dict = entry.dict()
    entry_dict["created_at"] = datetime.utcnow()
    result = await knowledge_base_collection.insert_one(entry_dict)
    inserted = await knowledge_base_collection.find_one({"_id": result.inserted_id})
    inserted["_id"] = str(inserted["_id"])
    return {"success": True, "message": "Knowledge base entry added successfully", "entry": inserted}