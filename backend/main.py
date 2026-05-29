from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import employee_routes
from routers import auth_routes, inventory_routes, station_routes

app = FastAPI()

# Allow your frontend domain
origins = [
    "https://station-frontend-194g.onrender.com",  # deployed frontend
    "http://localhost:5173",                       # local Vite dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],          # allow all HTTP methods
    allow_headers=["*"],          # allow all headers
)


app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
app.include_router(inventory_routes.router, prefix="/inventory", tags=["inventory"])
app.include_router(employee_routes.router, prefix="/employee", tags=["employee"])
app.include_router(station_routes.router, prefix="/station", tags=["station"])