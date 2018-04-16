#!/usr/bin/env python3

import os
from server import app

# FLASK_ENV should either be 'dev' or 'prod'
# (default is 'dev')
env = os.environ.get("FLASK_ENV", "dev")

if __name__ == "__main__":
    if env == "dev":
        app.run(debug=True, threaded=True)
    elif env == "prod":
        app.run(host="0.0.0.0", port=80, threaded=True)
