# models/employee_model.py
from pydantic import BaseModel

class Employee(BaseModel):
    emp_id: str
    name: str
    email: str
    position: str
    contact: str
    department: str
    client: str
    status: str
