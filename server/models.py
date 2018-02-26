
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String


Base = declarative_base()

class Shelter(Base):
    __tablename__ = "parks"

    id = Column(String, primary_key=True)
