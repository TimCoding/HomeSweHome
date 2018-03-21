from flask import jsonify, request

from server import app
from server.models import Dog, Shelter, Park
from server.database import db_session
from server.geo import order_zips

NEARBY_LIMIT = 5


def raise_error(message, code=400):
    return jsonify({
        "message": message,
        "code": code
    }), code


@app.route("/api/")
def api_root():
    return "See https://epicdavi.gitbooks.io/api/ for more information"


@app.route("/api/dog/<int:dog_id>/")
def get_dog(dog_id):
    dog = db_session.query(Dog).get(dog_id)
    if dog is None:
        return raise_error("A dog with that ID was not found.", 404)
    dog_json = dog.jsonify()
    dog_json["shelter"] = dog.shelter.jsonify()
    return jsonify(dog_json)


@app.route("/api/dog/<int:dog_id>/nearby/")
def get_dog_nearby(dog_id):
    dog = db_session.query(Dog).get(dog_id)
    if dog is None:
        return raise_error("A dog with that ID was not found.", 404)
    zipcode = dog.zipcode
    nearby_zips = order_zips(zipcode)[0:10]
    parks = db_session.query(Park).filter(Park.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
    shelters = db_session.query(Shelter).filter(Shelter.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
    return jsonify({
        "parks": [
            park.jsonify() for park in parks
        ],
        "shelters": [
            shelter.jsonify() for shelter in shelters
        ]
    })


@app.route("/api/dogs/")
def get_dogs():
    start = int(request.args.get("start", 0))
    limit = int(request.args.get("limit", 10))
    if start < 0:
        return raise_error("The start parameter must be non-negative.")
    if limit <= 0:
        return raise_error("The limit parameter must be greater than 0.")
    base_query = db_session.query(Dog)
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
def get_shelter(shelter_id):
    shelter = db_session.query(Shelter).get(shelter_id)
    if shelter is None:
        return raise_error("A shelter with that ID was not found.")
    shelter_json = shelter.jsonify()
    shelter_json["dogs"] = [
        dog.jsonify() for dog in shelter.dogs
    ]
    shelter_json["nearby_parks"] = []
    return jsonify(shelter_json)


@app.route("/api/shelter/<shelter_id>/nearby/")
def get_shelter_nearby(shelter_id):
    shelter = db_session.query(Shelter).get(shelter_id)
    if shelter is None:
        return raise_error("A shelter with that ID was not found.")
    zipcode = shelter.zipcode
    nearby_zips = order_zips(zipcode)[0:10]
    parks = db_session.query(Park).filter(Park.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
    dogs = db_session.query(Dog).filter(Dog.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
    return jsonify({
        "parks": [
            park.jsonify() for park in parks
        ],
        "dogs": [
            dog.jsonify() for dog in dogs
        ]
    })


@app.route("/api/shelters/")
def get_shelters():
    start = int(request.args.get("start", 0))
    limit = int(request.args.get("limit", 10))
    if start < 0:
        return raise_error("The start parameter must be non-negative.")
    if limit <= 0:
        return raise_error("The limit parameter must be greater than 0.")
    base_query = db_session.query(Shelter)
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
def get_park(park_id):
    park = db_session.query(Park).get(park_id)
    if park is None:
        return raise_error("A park with that ID was not found.", 404)
    park_json = park.jsonify()
    return jsonify(park_json)


@app.route("/api/park/<park_id>/nearby/")
def get_park_nearby(park_id):
    park = db_session.query(Park).get(park_id)
    if park is None:
        return raise_error("A park with that ID was not found.", 404)
    zipcode = park.zipcode
    nearby_zips = order_zips(zipcode)[0:10]
    shelters = db_session.query(Shelter).filter(Shelter.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
    dogs = db_session.query(Dog).filter(Dog.zipcode.in_(nearby_zips)).limit(NEARBY_LIMIT).all()
    return jsonify({
        "shelters": [
            shelter.jsonify() for shelter in shelters
        ],
        "dogs": [
            dog.jsonify() for dog in dogs
        ]
    })


@app.route("/api/parks/")
def get_parks():
    start = int(request.args.get("start", 0))
    limit = int(request.args.get("limit", 10))
    if start < 0:
        return raise_error("The start parameter must be non-negative.")
    if limit <= 0:
        return raise_error("The limit parameter must be greater than 0.")
    base_query = db_session.query(Park)
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
