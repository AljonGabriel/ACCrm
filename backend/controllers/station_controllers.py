from fastapi import HTTPException
from bson import ObjectId
from models.station_model import Station
from db import stations_collection

# Seed 27 stations for Prod 1
async def init_stations_controller():
    stations = []   

    # Left side: 6 front + 6 back
    for i in range(6):
        stations.append({"production": "Prod 1", "location": "Left Front", "hostname": None, "ip": None, "status": "Offline"})

    # Right side: 6 front + 6 back
    for i in range(7):
        stations.append({"production": "Prod 1", "location": "Right Front", "hostname": None, "ip": None, "status": "Offline"})
    for i in range(7):
        stations.append({"production": "Prod 1", "location": "Right Back", "hostname": None, "ip": None, "status": "Offline"})

    # TL stations: 3 front
    for i in range(3):
        stations.append({"production": "Prod 1", "location": "TL Front", "hostname": None, "ip": None, "status": "Offline"})

    # Back-to-back: 4
    for i in range(4):
        stations.append({"production": "Prod 1", "location": "Back-to-Back", "hostname": None, "ip": None, "status": "Offline"})

    result = await stations_collection.insert_many(stations)
    return {"success": True, "message": f"{len(result.inserted_ids)} stations inserted"}

# Get all stations
async def get_stations_controller():
    stations = []
    async for s in stations_collection.find():
        s["_id"] = str(s["_id"])
        stations.append(s)
    return stations

# Update station
async def update_station_controller(station_id: str, station: Station):
    result = await stations_collection.update_one(
        {"_id": ObjectId(station_id)},
        {"$set": station.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Station not found or no changes")
    updated = await stations_collection.find_one({"_id": ObjectId(station_id)})
    updated["_id"] = str(updated["_id"])
    return {"success": True, "message": "Station updated", "station": updated}

# Delete station
async def delete_station_controller(station_id: str):
    result = await stations_collection.delete_one({"_id": ObjectId(station_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Station not found")
    return {"success": True, "message": "Station deleted"}
