from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import employee_routes
from routers import auth_routes, inventory_routes, station_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
app.include_router(inventory_routes.router, prefix="/inventory", tags=["inventory"])
app.include_router(employee_routes.router, prefix="/employee", tags=["employee"])
app.include_router(station_routes.router, prefix="/station", tags=["station"])