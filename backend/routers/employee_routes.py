from fastapi import APIRouter
from models.employee_model import Employee
from controllers.employee_controller import add_employee, list_employees, update_employee, delete_employee

router = APIRouter()

@router.post("/add")
async def create_employee(employee: Employee):
    return await add_employee(employee)

@router.get("/list")
async def get_employees():
    return await list_employees()

@router.put("/update/{emp_id}")
async def edit_employee(emp_id: str, update_data: dict):
    return await update_employee(emp_id, update_data)

@router.delete("/delete/{emp_id}")
async def remove_employee(emp_id: str):
    return await delete_employee(emp_id)
