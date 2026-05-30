from fastapi import HTTPException
from bson import ObjectId
from models.station_model import Station
from db import stations_collection

# Seed stations for Prod 1 and Prod 2, skipping duplicates
async def init_stations_controller():
    stations_to_insert = []

    async def add_station_if_not_exists(production, location, index):
        # Check by production + location + index to avoid duplicates
        existing = await stations_collection.find_one({
            "production": production,
            "location": location,
            "index": index
        })
        if not existing:
            stations_to_insert.append({
                "production": production,
                "location": location,
                "index": index,
                "hostname": None,
                "ip": None,
                "status": "Offline"
            })

    # ---------------- Prod 1 ----------------
    for i in range(6):
        await add_station_if_not_exists("Prod 1", "Left Front", i)
    for i in range(6):
        await add_station_if_not_exists("Prod 1", "Left Back", i)
    for i in range(7):
        await add_station_if_not_exists("Prod 1", "Right Front", i)
    for i in range(7):
        await add_station_if_not_exists("Prod 1", "Right Back", i)
    for i in range(3):
        await add_station_if_not_exists("Prod 1", "TL Front", i)
    for i in range(4):
        await add_station_if_not_exists("Prod 1", "Back-to-Back", i)

    # ---------------- Prod 2 ----------------
    # Front: 4 rows × 4 stations = 16
    for row in range(4):
        for col in range(4):
            idx = row * 4 + col
            await add_station_if_not_exists("Prod 2", "Front", idx)

    # Back: 1 row × 2 stations = 2
    for i in range(2):
        await add_station_if_not_exists("Prod 2", "Back", i)

    # Insert only new stations
    if stations_to_insert:
        result = await stations_collection.insert_many(stations_to_insert)
        return {"success": True, "message": f"{len(result.inserted_ids)} new stations inserted"}
    else:
        return {"success": True, "message": "No new stations inserted, all already exist"}


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
