from contextlib import contextmanager
from functools import wraps

from flask import jsonify, request

from server import app
from server.models import Dog, Shelter, Park
from server.database import db_session
from server.geo import order_zips, ZipNotFoundException

NEARBY_LIMIT = 5


class ResponseError(Exception):

    def __init__(self, message, response):
        super().__init__(message)
        self.response = response


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


def convert_error_response(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ResponseError as e:
            return e.response
    return wrapped


def raise_error(message, code=400):
    return jsonify({
        "message": message,
        "code": code
    }), code


def get_int_arg(arg, default):
    try:
        return int(request.args.get(arg, default))
    except TypeError:
        raise ResponseError(
            "Argument is not int.",
            raise_error("The {0} argument must be an integer!".format(arg), 400)
        )


@app.route("/api/")
def api_root():
    return "See https://epicdavi.gitbooks.io/api/ for more information"


@app.route("/api/dog/<int:dog_id>/")
@retry_once
@convert_error_response
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
@convert_error_response
def get_dog_nearby(dog_id):
    with make_session() as session:
        dog = session.query(Dog).get(dog_id)
        if dog is None:
            return raise_error("A dog with that ID was not found.", 404)
        zipcode = dog.zipcode
        try:
            nearby_zips = order_zips(zipcode)[0:10]
        except ZipNotFoundException:
            return jsonify({
                "parks": [],
                "shelters": []
            })
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
@convert_error_response
def get_dogs():
    with make_session() as session:
        start = get_int_arg("start", 0)
        limit = get_int_arg("limit", 10)
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
@convert_error_response
def get_shelter(shelter_id):
    with make_session() as session:
        shelter = session.query(Shelter).get(shelter_id)
        if shelter is None:
            return raise_error("A shelter with that ID was not found.", 404)
        shelter_json = shelter.jsonify()
        return jsonify(shelter_json)


@app.route("/api/shelter/<shelter_id>/dogs/")
@retry_once
@convert_error_response
def get_dogs_in_shelter(shelter_id):
    with make_session() as session:
        start = get_int_arg("start", 0)
        limit = get_int_arg("limit", 10)
        if start < 0:
            return raise_error("The start parameter must be non-negative.")
        if limit <= 0:
            return raise_error("The limit parameter must be greater than 0.")
        base_query = session.query(Dog).filter(Dog.shelter_id == shelter_id)
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


@app.route("/api/shelter/<shelter_id>/nearby/")
@retry_once
@convert_error_response
def get_shelter_nearby(shelter_id):
    with make_session() as session:
        shelter = session.query(Shelter).get(shelter_id)
        if shelter is None:
            return raise_error("A shelter with that ID was not found.")
        zipcode = shelter.zipcode
        try:
            nearby_zips = order_zips(zipcode)[0:10]
        except ZipNotFoundException:
            return jsonify({
                "parks": [],
                "dogs": []
            })
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
@convert_error_response
def get_shelters():
    with make_session() as session:
        start = get_int_arg("start", 0)
        limit = get_int_arg("limit", 10)
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
@convert_error_response
def get_park(park_id):
    with make_session() as session:
        park = session.query(Park).get(park_id)
        if park is None:
            return raise_error("A park with that ID was not found.", 404)
        park_json = park.jsonify()
        return jsonify(park_json)


@app.route("/api/park/<park_id>/nearby/")
@retry_once
@convert_error_response
def get_park_nearby(park_id):
    with make_session() as session:
        park = session.query(Park).get(park_id)
        if park is None:
            return raise_error("A park with that ID was not found.", 404)
        zipcode = park.zipcode
        try:
            nearby_zips = order_zips(zipcode)[0:10]
        except ZipNotFoundException:
            return jsonify({
                "dogs": [],
                "shelters": []
            })
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
@convert_error_response
def get_parks():
    with make_session() as session:
        start = get_int_arg("start", 0)
        limit = get_int_arg("limit", 10)
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
