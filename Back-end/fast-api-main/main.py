from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



db = []


class Member(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None


class Club(BaseModel):
    club_name: Optional[str] = None
    club_address: Optional[str] = None
    club_members: List[Member]


class City(BaseModel):
    clubs: List[Club]

class ClubList(BaseModel):
    lst : List[City]




@app.get('/info')
def get_info():
    return db


@app.post('/cities')
def create_info(city: ClubList):
    db.append(city)
    return db[-1]