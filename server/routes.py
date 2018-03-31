import json
from collections import defaultdict
from copy import deepcopy

from flask import send_from_directory, render_template, jsonify, request
import requests
import random

from server import app
from server import api
from server import database

import os


about_location = os.path.join(os.path.dirname(__file__), "data/about_people.json")
f = open(about_location, "r")
about_people_json = json.load(f)
f.close()


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


def render_component(component_name, props=None):
    if props is None:
        return render_template("render_component.html", component_name=component_name)
    return render_template("render_component.html", component_name=component_name, props=json.dumps(props))

@app.route("/test/")
def test():
    return render_component("Multiselect")


@app.route("/paginationtest")
def pagination():
    return render_component("ModelPagination")


@app.route("/")
def splash():
    return render_component("Splash")


@app.route("/search/")
def search():
    query = request.args.get("query", "")
    return render_component("Search", props={
        "query": query
    })


@app.route("/dogs/")
def dog_model():
    return render_component("ModelPage", props={
        "model": "dogs"
    })


@app.route("/dog/<dogID>/")
def dog_details(dogID):
    return render_component("DogDetails", props={
        "dogID": dogID
    })


@app.route("/parks/")
def park_model():
    return render_component("ModelPage", props={
        "model": "parks"
    })


@app.route("/park/<parkID>/")
def park_details(parkID):
    return render_component("ParkDetails", props={
        "parkID": parkID
    })


@app.route("/shelters/")
def shelter_model():
    return render_component("ModelPage", props={
        "model": "shelters"
    })


@app.route("/shelter/<shelterID>/")
def shelter_details(shelterID):
    return render_component("ShelterDetails", props={
        "shelterID": shelterID
    })


@app.route("/about/")
def about():
    return render_component("About")


@app.route("/about/data/")
def about_data():
    users = deepcopy(about_people_json)
    for user in users:
        users[user]["issues"] = 0
        users[user]["commits"] = 0

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
            users[user]["issues"] = users[user]["issues"] + 1

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
                    users[user]["commits"] = users[user]["commits"] + 1

        commit_api_url = get_next_url(commit_req.headers.get("link"))

    data = {
        "users": users,
        "totals": {
            "issues": total_issues,
            "commits": total_commits,
            "unit_tests": sum(
                users[user]["unit_tests"] for user in users
            )
        }
    }

    return jsonify(data)
