from pydantic import BaseModel
from typing import Optional

class Station(BaseModel):
    hostname: Optional[str] = None
    ip: Optional[str] = None
    production: str   # "Prod 1" or "Prod 2"
    location: str     # e.g. "Left Front", "Left Back", "Right Front", "Right Back", "TL Front", "Back-to-Back"
    status: Optional[str] = "Offline"
    anydesk_id: Optional[str] = None   # Remote support ID
    mac_address: Optional[str] = None  # Device MAC address
    stationed: Optional[str] = None    # Assigned user or department
