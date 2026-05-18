from datetime import datetime, timedelta
from jose import JWTError, jwt
from db import users_collection

SECRET_KEY = "supersecretkey"   # 🔒 change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

async def login_user(email: str, password: str):
    user = await users_collection.find_one({"email": email})
    if user and user["password"] == password:
        # ✅ Create JWT token
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token_data = {"sub": email, "exp": expire}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

        return {"success": True, "message": "Login successful", "token": token}
    return {"success": False, "message": "Invalid credentials"}
