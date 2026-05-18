from bson import ObjectId
from fastapi import HTTPException
from db import employee_collection
from models.employee_model import Employee

# Add employee
async def add_employee(employee: Employee):
    result = await employee_collection.insert_one(employee.dict())
    inserted = await employee_collection.find_one({"_id": result.inserted_id})
    inserted["_id"] = str(inserted["_id"])
    return {"success": True, "message": "Employee added successfully", "employee": inserted}

# List employees
async def list_employees():
    cursor = employee_collection.find({})
    employees = []
    async for emp in cursor:
        emp["_id"] = str(emp["_id"])
        employees.append(emp)
    return {"employees": employees}

# Update employee
async def update_employee(emp_id: str, update_data: dict):
    try:
        oid = ObjectId(emp_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid employee ID")

    result = await employee_collection.update_one({"_id": oid}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    updated = await employee_collection.find_one({"_id": oid})
    updated["_id"] = str(updated["_id"])
    return {"success": True, "message": "Employee updated successfully", "employee": updated}

# Delete employee
async def delete_employee(emp_id: str):
    try:
        oid = ObjectId(emp_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid employee ID")

    result = await employee_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"success": True, "message": "Employee deleted successfully"}
