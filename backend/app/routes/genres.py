# routes/genres.py
from fastapi import APIRouter
from bson import ObjectId
from app.database import get_db

router = APIRouter()

def serialize_genre(genre: dict) -> dict:
    genre["_id"] = str(genre["_id"])
    genre["movie_ids"] = [str(m) for m in genre.get("movie_ids", [])]
    return genre

@router.get("/genres")
async def get_genres():
    db = get_db()
    genres_cursor = db["genres"].find()
    genres_list = []
    async for g in genres_cursor:
        genres_list.append(serialize_genre(g))
    return genres_list
