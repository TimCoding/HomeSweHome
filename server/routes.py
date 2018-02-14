import json
from collections import defaultdict

from flask import send_from_directory, render_template
import requests

from server import app

import os, sys
PATH_TO_JSON = os.path.join(os.path.dirname(os.getcwd()), os.path.basename(os.getcwd()), "json")
sys.path.insert(0, PATH_TO_JSON)

@app.route("/")
def splash():
    return render_template("splash.html")


@app.route("/about/")
def about():
    users = ["EpicDavi", "gmac220", "TimCoding", "rebekkahkoo", "ewk298"]
    attrs = {user: defaultdict(int) for user in users}

    issue_params = {"state": "all"}
    issues_req = requests.get("https://api.github.com/repos/TimCoding/HomeSweHome/issues", params=issue_params)
    issues_json = issues_req.json()

    if len(issues_json) == 0:
        issues_req = requests.get("https://api.github.com/repos/TimCoding/HomeSweHome/issues", params=issue_params)
        issues_json = issues_req.json()

    total_issues = 0

    for issue in issues_json:
        user = issue["user"]["login"]
        attrs[user]["issues"] = attrs[user]["issues"] + 1
        total_issues += 1

    contribs_req = requests.get("https://api.github.com/repos/TimCoding/HomeSweHome/stats/contributors")
    contribs_json = contribs_req.json()

    if len(contribs_json) == 0:
        contribs_req = requests.get("https://api.github.com/repos/TimCoding/HomeSweHome/stats/contributors")
        contribs_json = contribs_req.json()

    total_commits = 0

    for contributor in contribs_json:
        user = contributor["author"]["login"]
        total = contributor["total"]
        attrs[user]["commits"] = attrs[user]["commits"] + total
        total_commits += total

    data = {
        "users": attrs,
        "totals": {
            "issues": total_issues,
            "commits": total_commits
        }
    }

    return render_template("about.html", gh_data=data)

@app.route("/dog_details")
def dog_details():
    dog_file = os.path.join(PATH_TO_JSON, "austin_dog.json")
    json_data = open(dog_file).read()
    dog_json = json.loads(json_data)

    options = [] # list of lists
    status = [] 
    contact = [] # list of dictionaries
    age = []
    size = []
    photos = [] # list of list of dicts
    # figure out how to grab only highest res photos and have photos list of lists
    dog_id = []
    shelter_pet_id = []
    breed = []
    name = []
    sex = []
    description = []
    mix = []
    shelter_id = []
    last_update = []

    for dog in dog_json["petfinder"]["pets"]["pet"]:
        options += [dog["options"].values()]
        status += dog["status"].values()
        contact = dog["contact"]
        age += dog["age"].values()
        size += dog["size"].values()
        photos += [dog["media"]["photos"]["photo"]]
        dog_id += dog["id"].values()
        shelter_pet_id += dog["shelterPetId"].values()
        breed += dog["breeds"]["breed"]
        name += dog["name"].values()
        sex += dog["sex"].values()
        description += dog["description"].values()
        mix += dog["mix"].values()
        shelter_id += dog["shelterId"].values()
        last_update += dog["lastUpdate"].values()

    phone = [p for p in contact["phone"].values()]
    state = [s for s in contact["state"].values()]
    addr2 = [addr for addr in contact["address2"].values()]
    email = [e for e in contact["email"].values()]
    city = [c for c in contact["city"].values()]
    z = [zi for zi in contact["zip"].values()]
    fax = [f for f in contact["fax"].values()]
    addr1 = [addr for addr in contact["address1"].values()]

    data = {
               "options": options,
               "status": status,
               "contact": {
                  "phone": phone,
                  "state": state,
                  "address2": addr2,
                  "email": email,
                  "city": city,
                  "zip": z,
                  "fax": fax,
                  "address1": addr1
               },
               "age": age,
               "size": size,
               "media": photos,
               "id": dog_id,
               "shelterPetId": shelter_pet_id,
               "breeds": breed,
               "name": name,
               "sex": sex,
               "description": description,
               "mix": mix,
               "shelterId": shelter_id,
               "lastUpdate": last_update,
            }

    return render_template("dog_details.html", dog_data=data)

@app.route("/dogs")
def dog_models():
    return render_template("dog_models.html")

@app.route("/park_details/<int:id>")
def park_details(id):
    park_file = os.path.join(PATH_TO_JSON, "texas_parks.json")
    json_data = open(park_file).read()
    park_json = json.loads(json_data)

    return render_template("park_details.html", park_data=park_json["data"][id])

@app.route("/parks")
def park_models():
    return render_template("park_models.html")

@app.route("/shelters")
def animalshelters_models():
    return render_template("shelter_models.html")

@app.route("/shelters/<int:page_num>")
def animalshelter_details(page_num):
    friends_for_life_data = ["Friends For Life", "107 E. 22nd Street Houston, TX 77008", "713-863-9835", "adoptionmanager@adoptfriends4life.org", "4/5", "https://s3-media4.fl.yelpcdn.com/bphoto/5E9ShzNCm4zAqWoweZnFdQ/o.jpg" ]
    austin_animal_center_data = ["Austin Animal Center", "7201 Levander Loop Austin, TX 78702", "(512)-978-0500", "animal.customerservice@austintexas.gov", "4/5", "https://s3-media1.fl.yelpcdn.com/bphoto/ovSLVz5Vzr84yUVqieCAcA/o.jpg"]
    houston_spca_data = ["Houston SPCA", "900 Portway Drive Houston, TX 77024", "(713) 869-7722", "adoptions@houstonspca.org", "3.5/5", "https://s3-media2.fl.yelpcdn.com/bphoto/JoMkKKBhRagstFKx98jhJA/o.jpg"]

    if page_num == 0:
        return render_template("shelter_details.html", data = friends_for_life_data)
    elif page_num == 1:
        return render_template("shelter_details.html", data = austin_animal_center_data)
    elif page_num ==2:
        return render_template("shelter_details.html", data = houston_spca_data)

@app.route("/<path:filename>")
def file(filename):
    return send_from_directory(app.static_folder, filename)
