import json
from collections import defaultdict

from flask import send_from_directory, render_template
import requests
import random

from server import app
from server import api
from server import database

import os, sys


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


@app.route("/dogs/")
def dog_model():
    return render_template("render_component.html", component_name="ModelPage", props=json.dumps({
        "model": "dogs"
    }))


@app.route("/dog/<dogID>/")
def dog_details(dogID):
    return render_template("render_component.html", component_name="DogDetails", props=json.dumps({
        "dogID": dogID
    }))


@app.route("/parks/")
def park_model():
    return render_template("render_component.html", component_name="ModelPage", props=json.dumps({
        "model": "parks"
    }))


@app.route("/park/<parkID>/")
def park_details(parkID):
    return render_template("render_component.html", component_name="ParkDetails", props=json.dumps({
        "parkID": parkID
    }))


@app.route("/shelters/")
def shelter_model():
    return render_template("render_component.html", component_name="ModelPage", props=json.dumps({
        "model": "shelters"
    }))


@app.route("/shelter/<shelterID>/")
def shelter_details(shelterID):
    return render_template("render_component.html", component_name="ShelterDetails", props=json.dumps({
        "shelterID": shelterID
    }))


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
