from functools import cmp_to_key
import os
import math

zip_locs = {}

# do all file processing at module load time
zips_location = os.path.join(os.path.dirname(__file__), "data/texas_zips.csv")

with open(zips_location, "r") as file:
    lines = iter(file.readlines())
    next(lines)  # skip heading of CSV
    for line in lines:
        zipcode, latitude, longitude = line.split(",")
        zipcode = int(zipcode)
        latitude = float(latitude)
        longitude = float(longitude)
        zip_locs[zipcode] = (latitude, longitude)


def haversine(loc1, loc2):
    # used this as reference:
    # https://stackoverflow.com/questions/19412462/getting-distance-between-two-points-based-on-latitude-longitude
    lat1, lon1 = loc1
    lat2, lon2 = loc2
    radius = 6371  # km radius of earth

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) * math.sin(dlon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = radius * c

    return d


def get_zip_distance(zip1, zip2):
    return haversine(
        zip_locs[zip1],
        zip_locs[zip2]
    )


def get_zip_distance_comparator(source):
    def zip_cmp(zip1, zip2):
        d1 = get_zip_distance(source, zip1)
        d2 = get_zip_distance(source, zip2)
        return d1 - d2

    return zip_cmp


def order_zips(source):
    return sorted(zip_locs.keys(), key=cmp_to_key(get_zip_distance_comparator(source)))


def zips_in_radius(source, km):
    in_radius = (zip_loc for zip_loc in zip_locs.keys() if get_zip_distance(source, zip_loc) <= km)
    return sorted(in_radius, key=cmp_to_key(get_zip_distance_comparator(source)))


def get_closest_zip(location):
    return min(
        ((zipcode, haversine(location, zip_locs[zipcode])) for zipcode in zip_locs.keys()),
        key=lambda x: x[1]
    )[0]


if __name__ == "__main__":
    print(zips_in_radius(77379, 10))
