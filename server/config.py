"""
Simple config class for reading authorization data
"""

import os
import json

default_location = os.path.join(os.path.dirname(__file__), "../auth.json")
auth_location = os.environ.get("AUTH_FILE_LOCATION", default_location)

if not os.path.exists(auth_location):
    print("Could not find the auth file!!!")
    print("Please make sure 'auth.json' is in your project root!")
    print("~~ check the Google docs ~~~")
    raise FileNotFoundError()

config = None

try:
    with open(auth_location, "r") as file:
        config = json.load(file)
except Exception as e:
    print("Error occurred while trying to read auth file!!!")
    raise e
