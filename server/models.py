from sqlalchemy import Table, Column, Integer, String, ForeignKey, Sequence, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Shelter(Base):
	__tablename__ = "shelter"
	pet_finder_id = Column(String(50), primary_key=True)
	name = Column(String)
	address = Column(String)
	city = Column(String(80))
	state = Column(String(50))
	longitude = Column(Float)
	latitude = Column(Float)
	phone_number = Column(String(20))
	description = Column(String)
	email = Column(String)
	zipcode = Column(Integer)
	image_url = Column(String)
	google_rating = Column(Float)
	google_id = Column(String)
	#Declaring one to many relationship here between Shelter and Dogs
	dog = relationship("Dog", back_populates = "shelter")

class Park(Base):
	__tablename__ = "park"
	id = Column(Integer, Sequence('park_id_seq'), primary_key=True)
	name = Column(String)
	address = Column(String)
	city = Column(String(80))
	state = Column(String(50))
	phone_number = Column(String(20))
	description = Column(String(255))
	zipcode = Column(Integer)
	image_url = Column(String)
	google_rating = Column(Float)
	google_id = Column(String)

class Dog(Base):
	__tablename__ = "dog"
	id = Column(Integer, Sequence('dog_id_seq'), primary_key=True)
	petfinder_id = Column(Integer)
	name = Column(String)
	phone_number = Column(String(20))
	address = Column(String)
	city = Column(String(80))
	state = Column(String(50))
	description = Column(String(255))
	image_url = Column(String)
	friendly = Column(Boolean)
	housetrained = Column(Boolean)
	shots = Column(Boolean)
	altered = Column(Boolean)
	#Declaring one to many relationship here between Shelter and Dogs
	shelter_id = Column(Integer, ForeignKey('shelter.pet_finder_id'))
	shelter = relationship("Shelter", back_populates="dog")
	#Declaring one to many relationship here between Dogs and Breed
	breed = relationship("Breed", back_populates = "dog")

class Breed(Base):
	__tablename__ = "breed"
	id = Column(Integer, Sequence('breed_id_seq'), primary_key=True)
	breed = Column(String)
	#Declaring one to many relationship here between Dogs and breed
	dog = relationship("Dog", back_populates = "breed")
	dog_id = Column(Integer, ForeignKey('dog.id'))
