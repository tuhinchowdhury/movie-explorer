import asyncio
from database import get_db, get_client

async def seed():
    db = get_db()

    await db["movies"].delete_many({})
    await db["actors"].delete_many({})
    await db["directors"].delete_many({})
    await db["genres"].delete_many({})

    genres = [
        {"name": "Sci-Fi"},
        {"name": "Action"},
        {"name": "Drama"},
        {"name": "Adventure"}
    ]
    genre_ids = await db["genres"].insert_many(genres)

    actors = [
        {"name": "Leonardo DiCaprio", "bio": "Academy Award winning actor."},
        {"name": "Joseph Gordon-Levitt", "bio": "Known for Inception, Looper."},
        {"name": "Elliot Page", "bio": "Actor in Juno, Inception."},
        {"name": "Christian Bale", "bio": "Played Batman in The Dark Knight trilogy."},
        {"name": "Matthew McConaughey", "bio": "Actor in Interstellar, Dallas Buyers Club."},
        {"name": "Anne Hathaway", "bio": "Actress in Interstellar, The Dark Knight Rises."}
    ]
    actor_ids = await db["actors"].insert_many(actors)

    directors = [
        {"name": "Christopher Nolan", "bio": "British-American film director."},
        {"name": "Steven Spielberg", "bio": "American director, known for Jurassic Park, E.T."}
    ]
    director_ids = await db["directors"].insert_many(directors)

    movies = [
        {
            "title": "Inception",
            "release_year": 2010,
            "director_id": director_ids.inserted_ids[0],
            "actor_ids": [actor_ids.inserted_ids[0], actor_ids.inserted_ids[1], actor_ids.inserted_ids[2]],
            "genre_ids": [genre_ids.inserted_ids[0], genre_ids.inserted_ids[1]]
        },
        {
            "title": "The Dark Knight",
            "release_year": 2008,
            "director_id": director_ids.inserted_ids[0],
            "actor_ids": [actor_ids.inserted_ids[3], actor_ids.inserted_ids[5]],
            "genre_ids": [genre_ids.inserted_ids[1], genre_ids.inserted_ids[2]]
        },
        {
            "title": "Interstellar",
            "release_year": 2014,
            "director_id": director_ids.inserted_ids[0],
            "actor_ids": [actor_ids.inserted_ids[4], actor_ids.inserted_ids[5]],
            "genre_ids": [genre_ids.inserted_ids[0], genre_ids.inserted_ids[3]]
        }
    ]
    await db["movies"].insert_many(movies)

    print("✅ Database seeded with sample data!")

if __name__ == "__main__":
    asyncio.run(seed())
    get_client().close()
