from flask import send_from_directory, render_template
from server import app


@app.route("/")
def splash():
    return render_template("splash.html")


@app.route("/<path:filename>")
def file(filename):
    return send_from_directory(app.static_folder, filename)
