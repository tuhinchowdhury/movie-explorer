# routes/directors.py
from fastapi import APIRouter
from bson import ObjectId
from app.database import get_db

router = APIRouter()

def serialize_director(director: dict) -> dict:
    director["_id"] = str(director["_id"])
    director["movie_ids"] = [str(m) for m in director.get("movie_ids", [])]
    return director

@router.get("/directors")
async def get_directors():
    db = get_db()
    directors_cursor = db["directors"].find()
    directors_list = []
    async for d in directors_cursor:
        directors_list.append(serialize_director(d))
    return directors_list
