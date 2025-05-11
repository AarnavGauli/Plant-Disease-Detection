from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"),tlsCAFile=certifi.where())
db = client['plant_ai']
users = db['users']
history_collection = db['predictions']
