from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from .config import config

postgres_url = "postgresql://" + config["postgres"]["username"] + ":" + config["postgres"]["password"] + "@" + config["postgres"]["host"] + "/" + config["postgres"]["database"]

engine = create_engine(postgres_url, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
	print("URL:" + postgres_url)
	from .models import Shelter, Park, Dog, Breed
	Base.metadata.create_all(bind=engine)
