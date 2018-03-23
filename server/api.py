from contextlib import contextmanager
from functools import wraps

from flask import jsonify, request

from server import app
from server.models import Dog, Shelter, Park
from server.database import db_session
from server.geo import order_zips

NEARBY_LIMIT = 5


@contextmanager
def make_session():
    session = db_session()
    yield session
    session.close()


def retry_once(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        r = None
        try:
            r = f(*args, **kwargs)
        except Exception as e1:
            print("Failed Once")
            print(e1)
            try:
                r = f(*args, **kwargs)
            except Exception as e2:
                print("Failed Twice")
                raise e2
        return r
    return wrapped


def raise_error(message, code=400):
    return jsonify({
        "message": message,
        "code": code
    }), code


@app.route("/api/")
def api_root():
    return "See https://epicdavi.gitbooks.io/api/ for more information"


@app.route("/api/dog/<int:dog_id>/")
@retry_once
def get_dog(dog_id):
    with make_session() as session:
        dog = session.query(Dog).get(dog_id)
        if dog is None:
            return raise_error("A dog with that ID was not found.", 404)
        dog_json = dog.jsonify()
        dog_json["shelter"] = dog.shelter.jsonify()
        return jsonify(dog_json)


@app.route("/api/dog/<int:dog_id>/nearby/")
@retry_once
def get_dog_nearby(dog_id):
    with make_session() as session:
        dog = session.query(Dog).get(dog_id)
        if dog is None:
            return raise_error("A dog with that ID was not found.", 404)
        zipcode = dog.zipcode
        nearby_zips = order_zips(zipcode)[0:10]
        parks = session.query(Park).filter(Park.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
        shelters = session.query(Shelter).filter(Shelter.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
        return jsonify({
            "parks": [
                park.jsonify() for park in parks
            ],
            "shelters": [
                shelter.jsonify() for shelter in shelters
            ]
        })


@app.route("/api/dogs/")
@retry_once
def get_dogs():
    with make_session() as session:
        start = int(request.args.get("start", 0))
        limit = int(request.args.get("limit", 10))
        if start < 0:
            return raise_error("The start parameter must be non-negative.")
        if limit <= 0:
            return raise_error("The limit parameter must be greater than 0.")
        base_query = session.query(Dog)
        count = base_query.count()
        dogs = base_query.offset(start).limit(limit).all()
        return jsonify({
            "start": start,
            "limit": limit,
            "total": count,
            "results": [
                dog.jsonify() for dog in dogs
            ]
        })


@app.route("/api/shelter/<shelter_id>/")
@retry_once
def get_shelter(shelter_id):
    with make_session() as session:
        shelter = session.query(Shelter).get(shelter_id)
        if shelter is None:
            return raise_error("A shelter with that ID was not found.")
        shelter_json = shelter.jsonify()
        shelter_json["dogs"] = [
            dog.jsonify() for dog in shelter.dogs
        ]
        return jsonify(shelter_json)


@app.route("/api/shelter/<shelter_id>/nearby/")
@retry_once
def get_shelter_nearby(shelter_id):
    with make_session() as session:
        shelter = session.query(Shelter).get(shelter_id)
        if shelter is None:
            return raise_error("A shelter with that ID was not found.")
        zipcode = shelter.zipcode
        nearby_zips = order_zips(zipcode)[0:10]
        parks = session.query(Park).filter(Park.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
        dogs = session.query(Dog).filter(Dog.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
        return jsonify({
            "parks": [
                park.jsonify() for park in parks
            ],
            "dogs": [
                dog.jsonify() for dog in dogs
            ]
        })


@app.route("/api/shelters/")
@retry_once
def get_shelters():
    with make_session() as session:
        start = int(request.args.get("start", 0))
        limit = int(request.args.get("limit", 10))
        if start < 0:
            return raise_error("The start parameter must be non-negative.")
        if limit <= 0:
            return raise_error("The limit parameter must be greater than 0.")
        base_query = session.query(Shelter)
        count = base_query.count()
        shelters = base_query.offset(start).limit(limit).all()
        return jsonify({
            "start": start,
            "limit": limit,
            "total": count,
            "results": [
                shelter.jsonify() for shelter in shelters
            ]
        })


@app.route("/api/park/<park_id>/")
@retry_once
def get_park(park_id):
    with make_session() as session:
        park = session.query(Park).get(park_id)
        if park is None:
            return raise_error("A park with that ID was not found.", 404)
        park_json = park.jsonify()
        return jsonify(park_json)


@app.route("/api/park/<park_id>/nearby/")
@retry_once
def get_park_nearby(park_id):
    with make_session() as session:
        park = session.query(Park).get(park_id)
        if park is None:
            return raise_error("A park with that ID was not found.", 404)
        zipcode = park.zipcode
        nearby_zips = order_zips(zipcode)[0:10]
        shelters = session.query(Shelter).filter(Shelter.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
        dogs = session.query(Dog).filter(Dog.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
        return jsonify({
            "shelters": [
                shelter.jsonify() for shelter in shelters
            ],
            "dogs": [
                dog.jsonify() for dog in dogs
            ]
        })


@app.route("/api/parks/")
@retry_once
def get_parks():
    with make_session() as session:
        start = int(request.args.get("start", 0))
        limit = int(request.args.get("limit", 10))
        if start < 0:
            return raise_error("The start parameter must be non-negative.")
        if limit <= 0:
            return raise_error("The limit parameter must be greater than 0.")
        base_query = session.query(Park)
        count = base_query.count()
        parks = base_query.offset(start).limit(limit).all()
        return jsonify({
            "start": start,
            "limit": limit,
            "total": count,
            "results": [
                park.jsonify() for park in parks
            ]
        })
