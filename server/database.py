from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from server.config import config
from server.models import Base, Dog, Park, Shelter, Breed

postgres_url = "postgresql://{username}:{password}@{host}/{database}".format(**config["postgres"])

engine = create_engine(postgres_url, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base.query = db_session.query_property()


def init_db():
    Base.metadata.create_all(bind=engine)


def drop_all_tables():
    names = engine.table_names()
    if "park" in names:
        Park.__table__.drop(engine)
    if "breed" in names:
        Breed.__table__.drop(engine)
    if "dog" in names:
        Dog.__table__.drop(engine)
    if "shelter" in names:
        Shelter.__table__.drop(engine)


def kill_background_procs():
    engine.execute("""
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE datname = current_database()
  AND pid <> pg_backend_pid();""")
