# routes/actors.py
from fastapi import APIRouter
from bson import ObjectId, errors
from app.database import get_db

router = APIRouter()

def serialize_actor(actor: dict) -> dict:
    actor["_id"] = str(actor["_id"])
    actor["movie_ids"] = [str(m) for m in actor.get("movie_ids", [])]
    return actor

@router.get("/actors")
async def get_actors():
    db = get_db()
    actors_cursor = db["actors"].find()
    actors_list = []
    async for a in actors_cursor:
        actors_list.append(serialize_actor(a))
    return actors_list
