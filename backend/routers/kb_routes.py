from fastapi import APIRouter
from controllers.kb_controller import add_kb_entry
from models.kb_model import KnowledgeBase

router = APIRouter()

@router.post("/add")
async def create_kb_entry(entry: KnowledgeBase):
    return await add_kb_entry(entry)