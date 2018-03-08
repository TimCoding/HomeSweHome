from flask import jsonify, request

from server import app


@app.route("/api/")
def api_root():
    return "See https://epicdavi.gitbooks.io/api/ for more information"


@app.route("/api/dog/<int:dog_id>/")
def get_dog(dog_id):
    return jsonify({
        "id": dog_id,
        "name": "Astro",
        "phone": "(555) 555 5555",
        "city": "Austin",
        "state": "Texas",
        "address": "1310 Big Bark Lane",
        "zip": 77379,
        "description": "Description of Astro",
        "images": ["http://photos.petfinder.com/photos/pets/37515777/1/?bust=1488209857&width=500&-x.jpg"],
        "friendly": False,
        "houstrained": False,
        "altered": True,
        "shelter_id": "TX155",
        "shelter": {
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
        },
        "breeds": ["Poodle"],
        "nearby_parks": [{
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


@app.route("/api/dogs/")
def get_dogs():
    start = request.args.get("start", 0)
    limit = request.args.get("limit", 10)
    return jsonify({
        "start": start,
        "limit": limit,
        "total": 2,
        "results": [
            {
                "id": 1,
                "name": "Astro",
                "phone": "(555) 555 5555",
                "city": "Austin",
                "state": "Texas",
                "zip": 78705,
                "address": "1310 Big Bark Lane",
                "description": "Description of Astro",
                "images": ["http://photos.petfinder.com/photos/pets/37515777/1/?bust=1488209857&width=500&-x.jpg"],
                "friendly": False,
                "houstrained": False,
                "altered": True,
                "shelter_id": "TX155",
                "breeds": ["poodle", "lab"],
            },
            {
                "id": 2,
                "name": "Timmy",
                "phone": "(555) 555 5555",
                "city": "Houston",
                "state": "Texas",
                "zip": 77379,
                "address": "1234 Small Bark Lane",
                "description": "Description of Timmy",
                "images": [
                    "http://photos.petfinder.com/photos/pets/41118057/1/?bust=1520459934&width=500&-x.jpg",
                    "http://photos.petfinder.com/photos/pets/41118057/2/?bust=1520459935&width=500&-x.jpg"
                ],
                "friendly": True,
                "houstrained": True,
                "altered": False,
                "shelter_id": "TX123",
                "breeds": ["poodle"],
            }
        ]
    })


@app.route("/api/shelter/<shelter_id>/")
def get_shelter(shelter_id):
    return jsonify({
        "id": "TX123",
        "name": "Big Doggers Brand",
        "address": "1 Bark Road",
        "phone": "(555) 555 5555",
        "email": "adoptpls@adopters.org",
        "zip": 77379,
        "city": "Houston",
        "state": "Texas",
        "longitude": -30.5,
        "latitude": 100.0,
        "images": [],
        "google_rating": 3.5,
        "google_id": "14253452",
        "dogs": [
            {
                "id": 2,
                "name": "Timmy",
                "phone": "(555) 555 5555",
                "city": "Houston",
                "state": "Texas",
                "zip": 77379,
                "address": "1234 Small Bark Lane",
                "description": "Description of Timmy",
                "images": [
                    "http://photos.petfinder.com/photos/pets/41118057/1/?bust=1520459934&width=500&-x.jpg",
                    "http://photos.petfinder.com/photos/pets/41118057/2/?bust=1520459935&width=500&-x.jpg"
                ],
                "friendly": True,
                "houstrained": True,
                "altered": False,
                "shelter_id": "TX123",
                "breeds": ["poodle"]
            }
        ],
        "nearby_parks": []
    })


@app.route("/api/shelters/")
def get_shelters():
    start = request.args.get("start", 0)
    limit = request.args.get("limit", 10)
    return jsonify({
        "start": start,
        "limit": limit,
        "total": 2,
        "results": [
            {
                "id": "TX123",
                "name": "Big Doggers Brand",
                "address": "1 Bark Road",
                "phone": "(555) 555 5555",
                "email": "adoptpls@adopters.org",
                "zip": 77379,
                "city": "Houston",
                "state": "Texas",
                "longitude": -30.5,
                "latitude": 100.0,
                "images": [],
                "google_rating": 3.5,
                "google_id": "14253452"
            },
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
    start = request.args.get("start", 0)
    limit = request.args.get("limit", 10)
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
