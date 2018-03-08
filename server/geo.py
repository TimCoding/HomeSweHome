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


def get_zip_distance(zip1, zip2):
    lat1, lon1 = zip_locs[zip1]
    lat2, lon2 = zip_locs[zip2]
    radius = 6371  # km radius of earth

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) * math.sin(dlon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = radius * c

    return d


def get_zip_distance_comparator(source):
    def zip_cmp(zip1, zip2):
        d1 = get_zip_distance(source, zip1)
        d2 = get_zip_distance(source, zip2)
        return d1 - d2

    return zip_cmp


def order_zips(source):
    return sorted(zip_locs.keys(), key=cmp_to_key(get_zip_distance_comparator(source)))


if __name__ == "__main__":
    a = order_zips(77379)
    print(a[:10])
