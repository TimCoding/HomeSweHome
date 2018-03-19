from sqlalchemy import Table, Column, Integer, String, Sequence, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Shelter(Base):
    __tablename__ = "shelter"
    petfinder_id = Column(String(50), primary_key=True)
    name = Column(String)
    address = Column(String)
    city = Column(String(80))
    state = Column(String(50))
    longitude = Column(Float)
    latitude = Column(Float)
    phone_number = Column(String(30))
    mission = Column(String)
    adoption_policy = Column(String)
    email = Column(String)
    zipcode = Column(Integer)
    image_urls = Column(String)
    google_rating = Column(Float)
    google_id = Column(String)
    # Declaring one to many relationship here between Shelter and Dogs
    dogs = relationship("Dog", back_populates="shelter")

    def __repr__(self):
        return "<Shelter(id=\"{}\", name=\"{}\", zip={})>".format(self.petfinder_id, self.name, self.zipcode)

    def jsonify(self):
        return {
            "id": self.petfinder_id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "longitude": self.longitude,
            "latitude": self.latitude,
            "phone": self.phone_number,
            "mission": self.mission,
            "adoption_policy": self.adoption_policy,
            "email": self.email,
            "zipcode": self.zipcode,
            "image_urls": self.image_urls.split("|"),
            "google_id": self.google_id,
            "google_rating": self.google_rating
        }


class Park(Base):
    __tablename__ = "park"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)
    city = Column(String(80))
    state = Column(String(50))
    phone_number = Column(String(30))
    description = Column(String)
    zipcode = Column(Integer)
    image_urls = Column(String)
    google_rating = Column(Float)
    google_id = Column(String)

    def __repr__(self):
        return "<Park(id={}, name=\"{}\", zip={})>".format(self.id, self.name, self.zipcode)

    def jsonify(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "phone": self.phone_number,
            "description": self.description,
            "zip": self.zipcode,
            "image_urls": self.image_urls.split("|"),
            "google_id": self.google_id,
            "google_rating": self.google_rating
        }


class Dog(Base):
    __tablename__ = "dog"
    petfinder_id = Column(Integer, primary_key=True)
    name = Column(String)
    phone_number = Column(String(30))
    address = Column(String)
    city = Column(String(80))
    state = Column(String(50))
    description = Column(String)
    zipcode = Column(Integer)
    image_urls = Column(String)
    friendly = Column(Boolean)
    housetrained = Column(Boolean)
    shots = Column(Boolean)
    altered = Column(Boolean)
    special_needs = Column(Boolean)
    # Declaring one to many relationship here between Shelter and Dogs
    shelter_id = Column(String(50), ForeignKey('shelter.petfinder_id'))
    shelter = relationship("Shelter", back_populates="dogs")
    # Declaring one to many relationship here between Dogs and Breed
    breeds = relationship("Breed", back_populates="dog")

    def __repr__(self):
        return "<Dog(id={}, name=\"{}\", zip={})>".format(self.petfinder_id, self.name, self.zipcode)

    def jsonify(self):
        return {
            "id": self.petfinder_id,
            "name": self.name,
            "phone": self.phone_number,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "description": self.description,
            "zipcode": self.zipcode,
            "image_urls": self.image_urls.split("|"),
            "friendly": self.friendly,
            "housetrained": self.housetrained,
            "shots": self.shots,
            "altered": self.altered,
            "special_needs": self.special_needs,
            "shelter_id": self.shelter_id,
            "breeds": [
                breed.breed for breed in self.breeds
            ]
        }


class Breed(Base):
    __tablename__ = "breed"
    # Declaring one to many relationship here between Dogs and breed
    dog = relationship("Dog", back_populates="breeds")
    dog_id = Column(Integer, ForeignKey('dog.petfinder_id'), primary_key=True)
    breed = Column(String, primary_key=True)

    def __repr__(self):
        return "<Breed(breed=\"{}\", dog_id={})>".format(self.breed, self.dog_id)
