import json
from collections import defaultdict

from flask import send_from_directory, render_template
import requests
import random

from server import app
from server import api
from server import database

import os, sys

PATH_TO_JSON = os.path.join(os.path.dirname(os.getcwd()), os.path.basename(os.getcwd()), "json")
sys.path.insert(0, PATH_TO_JSON)


@app.url_defaults
def cache_bust_static(endpoint, values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            # lu stands for last updated
            values["lu"] = int(os.stat(file_path).st_mtime)


@app.teardown_appcontext
def shutdown_session(exception=None):
    database.db_session.remove()


@app.route("/")
def splash():
    return render_template("render_component.html", component_name="Splash")

@app.route("/test/")
def test():
    return render_template("render_component.html", component_name="DogCard")
    # return render_template("render_component.html", component_name="ControlledCarousel")
    # return render_template("render_component.html", component_name="NavBar")

@app.route("/react_test/")
def react_test():
    return render_template("render_component.html", component_name="Lmao", props=json.dumps({
        "text": "lmao"
    }))

@app.route("/react_model/")
def react_model():
	return render_template("render_component.html", component_name="ModelPage")

@app.route("/dog_details/<dogID>/")
def desc_test():
    return render_template("render_component.html", component_name="DogDetails", props=json.dumps({"dogID" : dogID}))

@app.route("/park_details_test/")
def park_details_test():
	return render_template("render_component.html", component_name="ParkDetails")


@app.route("/shelter_meme_test/<shelterID>/")
def shelter_details_test_with_id(shelterID):
    return render_template("render_component.html", component_name="ShelterDetails", props=json.dumps({
        "shelterID": shelterID
    }))


@app.route("/shelter_details_test/")
def shelter_details_test():
    return render_template("render_component.html", component_name="ShelterDetails")





@app.route("/about/")
def about():
    users = ["dav-s", "gmac220", "TimCoding", "rebekkahkoo", "ewk298"]
    attrs = {user: defaultdict(int) for user in users}

    issue_params = {"state": "all", "per_page": 100}
    issue_list = []

    issues_api_url = "https://api.github.com/repos/TimCoding/HomeSweHome/issues"

    def get_next_url(link_header):
        if link_header is None:
            return None
        for link_entry in link_header.split(", "):
            link, rel = link_entry.split("; ")
            rel = rel.split('"')[1]
            if rel == "next":
                link = link.split(">")[0].split("<")[1]  # get the part in between the first < >
                return link
        return None

    while issues_api_url is not None:
        issues_req = requests.get(issues_api_url, params=issue_params)
        issues_json = issues_req.json()

        if len(issues_json) == 0:
            issues_req = requests.get(issues_api_url, params=issue_params)
            issues_json = issues_req.json()

        issue_list.extend(issues_json)
        issues_api_url = get_next_url(issues_req.headers.get("link"))

    total_issues = 0

    for issue in issue_list:
        user = issue["user"]["login"]
        total_issues += 1
        if user in users:
            attrs[user]["issues"] = attrs[user]["issues"] + 1

    commit_api_url = "https://api.github.com/repos/TimCoding/HomeSweHome/commits"

    total_commits = 0

    while commit_api_url is not None:
        commit_req = requests.get(commit_api_url)
        commit_json = commit_req.json()

        if len(commit_json) == 0:
            commit_req = requests.get(commit_api_url)
            commit_json = commit_req.json()

        for commit in commit_json:
            total_commits += 1
            if commit["author"] and "login" in commit["author"]:
                user = commit["author"]["login"]
                if user in user:
                    attrs[user]["commits"] = attrs[user]["commits"] + 1

        commit_api_url = get_next_url(commit_req.headers.get("link"))

    data = {
        "users": attrs,
        "totals": {
            "issues": total_issues,
            "commits": total_commits
        }
    }

    return render_template("about.html", gh_data=data)

@app.route("/dog_details/<int:id>")
def dog_details(id):
    dog_file = os.path.join(PATH_TO_JSON, "austin_dog.json")
    json_data = open(dog_file).read()
    dog_json = json.loads(json_data)

    dog_data = []
    data = {}
    for dog in dog_json["petfinder"]["pets"]["pet"]:
        data["options"] = list(dog["options"].values())
        data["status"] = list(dog["status"].values())
        data["contact"] = {
            "phone":dog["contact"]["phone"],
            "state": dog["contact"]["state"],
            "address2":dog["contact"]["address2"],
            "email":dog["contact"]["email"],
            "city":dog["contact"]["city"],
            "zip":dog["contact"]["zip"],
            "fax":dog["contact"]["fax"],
            "address1":dog["contact"]["address1"]
            }
        data["age"] = list(dog["age"].values())
        data["size"] = list(dog["size"].values())
        data["media"] = [photo["$t"] for photo in dog["media"]["photos"]["photo"]]
        data["id"] = list(dog["id"].values())
        data["shelterPetId"] = list(dog["shelterPetId"].values())
        data["breeds"] = dog["breeds"]["breed"]
        data["name"] = list(dog["name"].values())
        data["sex"] = list(dog["sex"].values())
        data["description"] = list(dog["description"].values())
        data["mix"] = list(dog["mix"].values())
        data["shelterId"] = list(dog["shelterId"].values())
        data["lastUpdate"] = list(dog["lastUpdate"].values())
        #SHELTER ROUTING REMOVE FOR IDB2
        data["shelterPage"] = random.randint(0, 3)
        dog_data.append(data.copy())

    return render_template("dog_details.html", dog_data=dog_data[id])


@app.route("/dogs")
def dog_models():
    return render_template("dog_models.html")

@app.route("/park_details/<int:id>")
def park_details(id):
    park_file = os.path.join(PATH_TO_JSON, "texas_parks.json")
    json_data = open(park_file).read()
    park_json = json.loads(json_data)

    info = [
            # "Alibates Flint Quarries",
            {   "address": "37084 Alibates Rd.Potter County, TX 79036",
                "phone" : "(806) 857-6680"
            },
            #"Amistad"
            {
                "address": "9685 Highway 90 West Del Rio, TX 78840",
                "phone": "(830)775-7491"
            },
            #"Big Bend"
            {   "address": "Big Bend National Park, TX 79834-0129",
                "phone" : "(432) 477-2251"
            },
            #"Big Thicket"
            {   "address": "6044 FM 420 Kountze, TX 77625 ",
                "phone": "(409) 951-6800"
            },
            #"Chamizal"
            {   "address": "800 South San Marcial Street El Paso, TX 79905 ",
                "phone": "(915) 532-7273"
            },

            #"El Camino Real de los Tejas"
            {   "address": "1100 Old Santa Fe Trail Santa Fe, NM 87505 ",
                "phone": "(505) 988-6098"
            },
            #"El Camino Real de Tierra Adentro"
            {   "address": "1100 Old Santa Fe Trail Santa Fe, NM 87505 ",
                "phone": "(505) 988-6098"
            },
            #"Fort Davis"
            {   "address": "101 Lt. Flipper Dr., Fort Davis, TX 79734",
                "phone": "(432) 426-3224"
            },
            #"Guadalupe Mountains"
            {   "address":  "400 Pine Canyon Salt Flat, TX 79847 ",
                "phone": "(915) 828-3251"
            },
            #"Lake Meredith"
            {  "address":  "419 E. Broadway Fritch, TX 79036 ",
                "phone": "(806) 857-3151"
            },
            #"Lyndon B Johnson"
            {   "address":  "100 Ladybird Lane Johnson City, TX 78636 ",
                "phone": "(830) 868-7128"
            },
            #"Padre Island"
            {  "address":  "20420 Park Road 22 Corpus Christi, TX 78418 ",
                "phone": "(361) 949-8068 "
            },
            #"Palo Alto Battlefield"
            {   "address":  "7200 Paredes Line Road Brownsville, TX 78526 ",
                "phone": "(956) 541-2785"
            },
            #"Rio Grande"
            {   "address":  "Rio Grande Wild & Scenic River 1 Panther Junction Big Bend National Park, TX 79834 ",
                "phone": "(432) 477-2251"
            },
            #"San Antonio Missions"
            {  "address":  "Visitor Center at Mission San José 6701 San Jose Drive San Antonio, TX 78214 ",
                "phone": "(210) 932-1001"
            },
            #"Waco Mammoth"
            {   "address":  "6220 Steinbeck Bend Drive Waco, TX 76708 ",
                "phone": "(254) 750-7946"
            }
        ]

    return render_template("park_details.html", park_data=park_json["data"][id], park_info=info[id])

@app.route("/parks")
def park_models():
    return render_template("park_models.html")

@app.route("/shelters")
def animalshelters_models():
    return render_template("shelter_models.html")

@app.route("/shelters/<int:page_num>")
def animalshelter_details(page_num):
    shelter_file = os.path.join(PATH_TO_JSON, "yelp_texas_shelters_50.json")
    json_data = open(shelter_file).read()
    shelter_json = json.loads(json_data)

    shelter_data = []

    for shelter in shelter_json["businesses"]:
        shelter_dict = {
            "id":shelter["id"],
            "name":shelter["name"],
            "image_url":shelter["image_url"],
            "url":shelter["url"],
            "categories":[shelter["categories"]],
            "rating":shelter["rating"],
            "address1":shelter["location"]["address1"],
            "city":shelter["location"]["city"],
            "zip":shelter["location"]["zip_code"],
            "country":shelter["location"]["country"],
            "state":shelter["location"]["state"],
            "display_address":shelter["location"]["display_address"],
            "phone":shelter["display_phone"]
        }
        shelter_data.append(shelter_dict.copy())

    return render_template("shelter_details.html", data=shelter_data[page_num])

    # friends_for_life_data = ["Friends For Life", "107 E. 22nd Street Houston, TX 77008", "713-863-9835", "adoptionmanager@adoptfriends4life.org", "4/5", "https://s3-media4.fl.yelpcdn.com/bphoto/5E9ShzNCm4zAqWoweZnFdQ/o.jpg" ]
    # austin_animal_center_data = ["Austin Animal Center", "7201 Levander Loop Austin, TX 78702", "(512)-978-0500", "animal.customerservice@austintexas.gov", "4/5", "https://s3-media1.fl.yelpcdn.com/bphoto/ovSLVz5Vzr84yUVqieCAcA/o.jpg"]
    # houston_spca_data = ["Houston SPCA", "900 Portway Drive Houston, TX 77024", "(713) 869-7722", "adoptions@houstonspca.org", "3.5/5", "https://s3-media2.fl.yelpcdn.com/bphoto/JoMkKKBhRagstFKx98jhJA/o.jpg"]

    # if page_num == 0:
    #     return render_template("shelter_details.html", data = friends_for_life_data)
    # elif page_num == 1:
    #     return render_template("shelter_details.html", data = austin_animal_center_data)
    # elif page_num ==2:
    #     return render_template("shelter_details.html", data = houston_spca_data)
