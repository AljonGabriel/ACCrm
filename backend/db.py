# db.py
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://aljongabrielambasvaldez_db_user:qA4rQBuU0BIQQtBi@accrm.ighs7gn.mongodb.net/?appName=ACCRM"
client = AsyncIOMotorClient(MONGO_URL)

# Database name
db = client["accrm"]

# Collections
users_collection = db["users"]          # for auth/login
inventory_collection = db["inventory"]  # for inventory items

