from fastapi import APIRouter, Form
from controllers.auth_controller import login_user

router = APIRouter()

@router.post("/login")
async def login(email: str = Form(...), password: str = Form(...)):
    return await login_user(email, password)
