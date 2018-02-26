from queue import Queue
from pprint import pprint
import requests


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
PETFINDER_API_KEY = "581ed5592e9dd0af3bc6f9e211cecce9"
YELP_BASE_API_URL = "http://api.yelp.com/"



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

            if "photo" in dog["media"]["photos"]:
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

#dont know where to add key and have not tested this
#could also make this a generalized yelp scraper but need to modify stuff
def fetch_park_info(state, limit, offset):
    params = {
        "term": "park",
        "location": state,
        "limit": limit,
        "offset": offset 
    }

    response = requests.get(YELP_BASE_API_URL + "v3/businesses/search", params=params)
    response_json = response.json()
    if "businesses" in response_json:
        park_data = response_json["businesses"]
        park_obj = {
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
        if "display_phone" in park_data["location"]:
            park_obj["phone"] = park_data["display_phone"]

if __name__ == "__main__":
    # example program
    shelter_ids = UniqueQueue()
    for zc in [78703, 77379, 78766]:
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
