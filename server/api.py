from flask import jsonify, request

from server import app
from server.models import Dog, Shelter, Park
from server.database import db_session


@app.route("/api/")
def api_root():
    return "See https://epicdavi.gitbooks.io/api/ for more information"


@app.route("/api/dog/<int:dog_id>/")
def get_dog(dog_id):
    dog = db_session.query(Dog).get(dog_id)
    if dog is None:
        # TODO: Handle this case
        return 404
    dog_json = dog.jsonify()
    dog_json["shelter"] = dog.shelter.jsonify()
    return jsonify(dog_json)


@app.route("/api/dogs/")
def get_dogs():
    start = int(request.args.get("start", 0))
    limit = int(request.args.get("limit", 10))
    if start < 0:
        # TODO: Handle this
        return 404
    if limit <= 0:
        # TODO: Handle this
        return 404
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
        # TODO: Handle this case
        return 404
    shelter_json = shelter.jsonify()
    shelter_json["dogs"] = [
        dog.jsonify() for dog in shelter.dogs
    ]
    shelter_json["nearby_parks"] = []
    return jsonify(shelter_json)


@app.route("/api/shelters/")
def get_shelters():
    start = int(request.args.get("start", 0))
    limit = int(request.args.get("limit", 10))
    if start < 0:
        # TODO: Handle this
        return 404
    if limit <= 0:
        # TODO: Handle this
        return 404
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
    park = db_session.query(Shelter).get(park_id)
    if park is None:
        # TODO: Handle this case
        return 404
    park_json = park.jsonify()
    park_json["nearby_shelters"] = []
    return jsonify(park_json)


@app.route("/api/parks/")
def get_parks():
    start = int(request.args.get("start", 0))
    limit = int(request.args.get("limit", 10))
    if start < 0:
        # TODO: Handle this
        return 404
    if limit <= 0:
        # TODO: Handle this
        return 404
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