from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from .config import config

postgres_url = "postgresql://{username}:{password}@{host}/{database}".format(**config["postgres"])

engine = create_engine(postgres_url, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base.query = db_session.query_property()


def init_db():
    print("URL:" + postgres_url)
    from .models import Shelter, Park, Dog, Breed
    Base.metadata.create_all(bind=engine)
