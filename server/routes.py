from flask import send_from_directory
from server import app


@app.route("/")
def splash():
    return "Splash Page"


@app.route("/<path:filename>")
def file(filename):
    return send_from_directory(app.static_folder, filename)
