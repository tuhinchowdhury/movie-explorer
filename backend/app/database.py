from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.database import Database

MONGO_URL = "mongodb+srv://tuhinchowdhury08:Iniaff08@cluster0.sdg9szt.mongodb.net/moviehall"

client: AsyncIOMotorClient = None

def get_client() -> AsyncIOMotorClient:
    global client
    if client is None:
        client = AsyncIOMotorClient(MONGO_URL)
    return client

def get_db() -> Database:
    return get_client()["moviehall"]
