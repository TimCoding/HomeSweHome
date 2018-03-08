from queue import Queue
from pprint import pprint
import os
import re
from difflib import SequenceMatcher

import requests
from bs4 import BeautifulSoup

if __name__ == '__main__':
    from config import config
else:
    from .config import confg


class UniqueQueue(Queue):
    """
    Makes a queue that can only have items added once to
    """

    def __init__(self, *args, **kwargs):
        super(UniqueQueue, self).__init__(*args, **kwargs)
        if "default_set" in kwargs:
            self.unique_set = kwargs["default_set"]
        else:
            self.unique_set = set()

    def put(self, item, **kwargs):
        if item in self.unique_set:
            return
        self.unique_set.add(item)
        super(UniqueQueue, self).put(item, **kwargs)


PETFINDER_BASE_API_URL = "http://api.petfinder.com/"
PETFINDER_API_KEY = config["petfinder"]["key"]
PETFINDER_HTML_HACK_URL = "https://www.petfinder.com/member/us/tx/city/description-{}/"
YELP_BASE_API_URL = "http://api.yelp.com/"
YELP_API_KEY = config["yelp"]["key"]
GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/"
GOOGLE_PLACES_API_KEY = config["places"]["key"]

PLACES_RADIUS = 10000
NAME_RATIO = 0.6


def fetch_shelter_html_hack(shelter_id):

    response = requests.get(PETFINDER_HTML_HACK_URL.format(shelter_id))
    # using "html5lib" instead of "html.parser" built in
    # "html.parser" doesn't parse Angular apps very accurately
    html = BeautifulSoup(response.text, "html5lib")

    shelter_obj = {
        "id": shelter_id.upper()
    }

    main = html.find(id="Site_Main")

    if main.select_one("[data-organization-name]") is not None:
        shelter_obj["name"] = main.select_one("[data-organization-name]").text.strip()

    # the city has a ", " appended on the end for some reason
    if main.find(itemprop="streetAddress") is not None:
        shelter_obj["address"] = main.find(itemprop="streetAddress").text.strip()
    if main.find(itemprop="addressLocality") is not None:
        shelter_obj["city"] = main.find(itemprop="addressLocality").text.split(",")[0]
    if main.find(itemprop="addressRegion") is not None:
        shelter_obj["state"] = main.find(itemprop="addressRegion").text.strip()
    if main.find(itemprop="postalCode") is not None:
        shelter_obj["zip"] = int(main.find(itemprop="postalCode").text.strip())

    directions_tag = main.select_one(".get-directions")
    if directions_tag is not None:
        shelter_obj["latitude"] = directions_tag["data-latitude"]
        shelter_obj["longitude"] = directions_tag["data-longitude"]

    if main.select_one("pf-ensighten > a[href^=mailto]") is not None:
        shelter_obj["email"] = main.select_one("pf-ensighten > a[href^=mailto]").text.strip()

    if main.select_one("pf-ensighten > a[href^=tel]") is not None:
        shelter_obj["phone"] = main.select_one("pf-ensighten > a[href^=tel]").text.strip()

    if main.find(string="Our Mission") is not None:
        shelter_obj["mission"] = "".join(
            str(child).strip() for child
            in main.find(string="Our Mission").parent.parent.find("p").children
        )

    if main.find(string=re.compile("Adoption Policy")) is not None:
        shelter_obj["adoption_policy"] = "".join(
            str(child).strip() for child
            in main.find(string=re.compile("Our Mission")).parent.parent.find("p").children
        )

    if main.select_one("[data-website-url]") is not None:
        shelter_obj["website"] = main.select_one("[data-website-url]").text.strip()

    shelter_obj["images"] = [
        img["src"] for img
        in main.select("img[pfdc-pet-carousel-slide]")
    ]

    return shelter_obj


def fetch_shelter_info(shelter_id):
    params = {
        "key": PETFINDER_API_KEY,
        "format": "json",
        "id": shelter_id
    }

    response = requests.get(PETFINDER_BASE_API_URL + "shelter.get", params=params)
    response_json = response.json()
    if "shelter" in response_json["petfinder"]:
        shelter_data = response_json["petfinder"]["shelter"]
        shelter_obj = {
            "id": shelter_id,
            "name": shelter_data["name"]["$t"],
            "zipcode": shelter_data["zip"]["$t"]
        }
        if "$t" in shelter_data["phone"]:
            shelter_obj["phone"] = shelter_data["phone"]["$t"]
        if "$t" in shelter_data["email"]:
            shelter_obj["email"] = shelter_data["email"]["$t"]
        if "$t" in shelter_data["city"]:
            shelter_obj["city"] = shelter_data["city"]["$t"]
        if "$t" in shelter_data["state"]:
            shelter_obj["state"] = shelter_data["state"]["$t"]
        if "$t" in shelter_data["address1"]:
            shelter_obj["address"] = shelter_data["address1"]["$t"]
        return shelter_obj
    # handle this case, raise exception?
    return None


def fetch_dogs_in_zip(zipcode, shelter_queue):
    """Returns a list of dog JSONs from PetFinder in a specified zip

    :param zipcode: zip code to search for dogs in
    :param shelter_queue: Queue that the function adds IDs of shelters to
    :return: list of dog JSONs
    """
    params = {
        "key": PETFINDER_API_KEY,
        "format": "json",
        "animal": "dog",
        "location": zipcode,
        "count": 25
    }

    dog_list = []

    while True:
        response = requests.get(PETFINDER_BASE_API_URL + "pet.find", params=params)
        response_json = response.json()
        if "pets" not in response_json["petfinder"]:
            break
        for dog in response_json["petfinder"]["pets"]["pet"]:
            dog_zipcode = dog["contact"]["zip"]["$t"]
            if str(dog_zipcode) != str(zipcode):
                # find out if I should break or return or what
                break
            shelter_id = dog["shelterId"]["$t"]
            shelter_queue.put(shelter_id)
            dog_obj = {
                "id": dog["id"]["$t"],
                "name": dog["name"]["$t"],
                "shelter_id": shelter_id,
                "zipcode": dog_zipcode
            }
            if "$t" in dog["description"]:
                dog_obj["description"] = dog["description"]["$t"]
            if "$t" in dog["contact"]["city"]:
                dog_obj["city"] = dog["contact"]["city"]["$t"]
            if "$t" in dog["contact"]["state"]:
                dog_obj["state"] = dog["contact"]["state"]["$t"]
            if "$t" in dog["contact"]["phone"]:
                dog_obj["phone"] = dog["contact"]["phone"]["$t"]
            if "$t" in dog["contact"]["address1"]:
                    dog_obj["address"] = dog["contact"]["address1"]["$t"]

            if "photos" in dog["media"] and "photo" in dog["media"]["photos"]:
                photos_json = dog["media"]["photos"]["photo"]
                photos_list = [
                    photo_json["$t"] for photo_json in photos_json
                    if photo_json["@size"] == "x"
                ]
                dog_obj["photos"] = photos_list

            dog_list.append(dog_obj)
        else:
            params["offset"] = response_json["petfinder"]["lastOffset"]["$t"]
            continue
        break
    return dog_list

def fetch_park_info(state, limit, offset):
    params = {
        "term": "park",
        "location": state,
        "limit": limit,
        "offset": offset
    }

    headers = {
        "Authorization": "Bearer " + YELP_API_KEY
    }

    response = requests.get(YELP_BASE_API_URL + "v3/businesses/search", params=params, headers=headers)
    response_json = response.json()
    for park_data in response_json["businesses"]:
        park_obj = {
            "id": park_data["id"],
            "name": park_data["name"],
            "rating": park_data["rating"],
            "coordinates": {
                "latitude": park_data["coordinates"]["latitude"],
                "longitude": park_data["coordinates"]["longitude"]
            },
            "location":{
                "city": park_data["location"]["city"],
                "state": park_data["location"]["state"],
                "disp_addr": park_data["location"]["display_address"]
            }
        }
        if "address1" in park_data["location"]:
            park_obj["location"]["address"] = park_data["location"]["address1"]
        if "zip_code" in park_data["location"]:
            park_obj["location"]["zip"] = park_data["location"]["zip_code"]
        if "display_phone" in park_data:
            park_obj["phone"] = park_data["display_phone"]
        park_obj["photos"] = fetch_park_photos(park_obj["id"])
        park_obj["reviews"] = fetch_park_reviews(park_obj["id"])

    return park_obj

def fetch_park_reviews(id):
    headers = {
        "Authorization": "Bearer " + YELP_API_KEY
    }

    response = requests.get(YELP_BASE_API_URL + "v3/businesses/" + id + "/reviews", headers=headers)
    response_json = response.json()
    reviews = []
    for review in response_json["reviews"]:
        park_rvw = {
            "text": review["text"],
            "user_rating": review["rating"],
            "author_name": review["user"]["name"]
        }
        reviews.append(park_rvw)

    return reviews

def fetch_park_photos(id):
    headers = {
        "Authorization": "Bearer " + YELP_API_KEY
    }

    response = requests.get(YELP_BASE_API_URL + "v3/businesses/" + id, headers=headers)
    response_json = response.json()
    photos = []
    for photo in response_json["photos"]:
        photos.append(photo)

    return photos


def fetch_shelter_details(keyword, location):
    params = {
        "key":GOOGLE_PLACES_API_KEY,
        "location":location,
        "keyword":keyword,
        "radius":PLACES_RADIUS
    }

    shelter_dict = {}

    response = requests.get(GOOGLE_PLACES_API_URL + "maps/api/place/nearbysearch/json", params=params)
    response_json = response.json()

    if "status" in response_json:
        if response_json["status"] == "ZERO_RESULTS":
            return "NO RESULTS"

    index = 0
    if len(response_json["results"]) > 1:
        temp = 0
        max_sim = 0
        for result in response_json["results"]:
            name = result["name"]
            sim = similarity(name, keyword)
            if sim > max_sim:
                max_sim = sim
                temp += 1

        if max_sim > NAME_RATIO:
            index = temp

    shelter_dict["name"] = response_json["results"][index]["name"]
    shelter_dict["address"] = response_json["results"][index]["vicinity"]
    shelter_dict["rating"] = response_json["results"][index]["rating"]
    shelter_dict["place_id"] = response_json["results"][index]["place_id"]
    fetch_shelter_hours_and_reviews(shelter_dict)

    return shelter_dict

def fetch_shelter_hours_and_reviews(shelter_dict):
    params = {
        "key": GOOGLE_PLACES_API_KEY,
        "placeid": shelter_dict["place_id"]
    }

    response = requests.get(GOOGLE_PLACES_API_URL + "maps/api/place/details/json", params=params)
    response_json = response.json()

    reviews = []

    if "reviews" in response_json["result"]:

        review_dict = {}

        for review in response_json["result"]["reviews"]:
            review_dict["author_name"] = review["author_name"]
            review_dict["rating"] = review["rating"]
            review_dict["text"] =  review["text"]
            reviews.append(review_dict)

        shelter_dict["reviews"] = reviews


    if "opening_hours" in response_json["result"]:
        shelter_dict["hours"] = response_json["result"]["opening_hours"]["weekday_text"]


def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()


if __name__ == "__main__":
    zips_location = os.path.join(os.path.dirname(__file__), "../texas_zips.csv")
    zips = open(zips_location, "r")
    # example program
    '''
    shelter_ids = UniqueQueue()
    for zc in [int(line.split(",")[0]) for line in zips.readlines()[1:21]]:
        dogs = fetch_dogs_in_zip(zc, shelter_ids)
        for dog in dogs:
            pprint(dog)
            print()
    print()
    print("SHELTERS:")
    print()
    while not shelter_ids.empty():
        shelter_id = shelter_ids.get()
        print(shelter_id)
        pprint(fetch_shelter_info(shelter_id))
        fetch_shelter_detail(shelter_id)
    '''
    #pprint(fetch_shelter_details("Henderson County Humane", "32.1991,-95.8661"))
    fetch_park_info("TX", 2, 0)
