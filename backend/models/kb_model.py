from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class KnowledgeBase(BaseModel):
    title: str                     # ✅ clearer than "issue"
    description: str               # ✅ context/details of the issue
    solution: str                  # ✅ troubleshooting steps or fix
    error_code: Optional[str] = None  # ✅ optional, not all issues have codes
    tags: Optional[list[str]] = []    # ✅ useful for search/filtering
    created_at: datetime = datetime.now()  # ✅ auto timestamp
    updated_at: Optional[datetime] = None  # ✅ track edits
