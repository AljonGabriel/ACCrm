from fastapi import APIRouter
from models.station_model import Station
from controllers.station_controllers import (
    init_stations_controller,
    get_stations_controller,
    update_station_controller,
    delete_station_controller
)

router = APIRouter(prefix="/stations", tags=["Stations"])

@router.post("/init")
async def init_stations():
    return await init_stations_controller()

@router.get("/")
async def get_stations():
    return await get_stations_controller()

@router.put("/{station_id}")
async def update_station(station_id: str, station: Station):
    return await update_station_controller(station_id, station)

@router.delete("/{station_id}")
async def delete_station(station_id: str):
    return await delete_station_controller(station_id)
