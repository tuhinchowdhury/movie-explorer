from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from app.database import get_db

router = APIRouter()

def str_id(oid):
    return str(oid) if oid else None

async def serialize_movie(movie: dict, db):
    """Convert ObjectId fields to strings and fetch related docs."""
    movie["_id"] = str_id(movie["_id"])

    # Director
    movie["director"] = None
    if "director_id" in movie:
        director = await db["directors"].find_one({"_id": ObjectId(movie["director_id"])})
        if director:
            movie["director"] = {"_id": str_id(director["_id"]), "name": director["name"]}

    # Actors
    movie["actors"] = []
    for aid in movie.get("actor_ids", []):
        actor = await db["actors"].find_one({"_id": ObjectId(aid)})
        if actor:
            movie["actors"].append({"_id": str_id(actor["_id"]), "name": actor["name"]})

    # Genres
    movie["genres"] = []
    for gid in movie.get("genre_ids", []):
        genre = await db["genres"].find_one({"_id": ObjectId(gid)})
        if genre:
            movie["genres"].append({"_id": str_id(genre["_id"]), "name": genre["name"]})

    # Clean raw ids
    movie.pop("director_id", None)
    movie.pop("actor_ids", None)
    movie.pop("genre_ids", None)

    return movie


# -----------------------
# Get one movie by ID
# -----------------------
@router.get("/movies/{movie_id}")
async def get_movie(movie_id: str):
    db = get_db()
    try:
        obj_id = ObjectId(movie_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid movie ID")

    movie = await db["movies"].find_one({"_id": obj_id})
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    movie = await serialize_movie(movie, db)
    return movie


# -----------------------
# Get many movies with filters
# -----------------------
@router.get("/movies")
async def get_movies(
    actor: str = Query(None),
    genre: str = Query(None),
    director: str = Query(None),
):
    """
    Filter movies by actor, genre, director.
    Any combination is supported.
    Example: /movies?actor=123&genre=456&director=789
    """
    db = get_db()
    query = {}

    try:
        if actor:
            query["actor_ids"] = ObjectId(actor)
        if genre:
            query["genre_ids"] = ObjectId(genre)
        if director:
            query["director_id"] = ObjectId(director)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid filter ID")

    cursor = db["movies"].find(query)
    movies = []
    async for m in cursor:
        movies.append(await serialize_movie(m, db))

    return movies
