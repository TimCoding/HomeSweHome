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


@app.route("/api/park/<int:park_id>/")
def get_park(park_id):
    return jsonify({
        "id": 215234,
        "name": "Bark Park",
        "address": "Highway 284",
        "city": "Austin",
        "state": "Texas",
        "phone": "(555) 555 5555",
        "description": "A pleasant park",
        "zip": 78705,
        "images": [],
        "google_rating": 4.0,
        "google_id": "48eq89d",
        "nearby_shelters": [
            {
                "id": "TX155",
                "name": "Doggers R US",
                "address": "99 Wag Lane",
                "phone": "(555) 555 5555",
                "email": "lmao@doggers.org",
                "zip": 78705,
                "city": "Austin",
                "state": "Texas",
                "longitude": -30.5,
                "latitude": 100.0,
                "images": [],
                "google_rating": 3.0,
                "google_id": "4235312"
            }
        ]
    })


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
    return jsonify({
        "start": start,
        "limit": limit,
        "total": 1,
        "results": [{
            "id": 215234,
            "name": "Bark Park",
            "address": "Highway 284",
            "city": "Austin",
            "state": "Texas",
            "phone": "(555) 555 5555",
            "description": "A pleasant park",
            "zip": 78705,
            "images": [],
            "google_rating": 4.0,
            "google_id": "48eq89d"
        }]
    })
