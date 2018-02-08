#!/usr/bin/env python3

import os
from server import app

env = os.environ.get("FLASK_ENV", "dev")

if __name__ == "__main__":
    if env == "dev":
        app.run(debug=True)
    elif env == "prod":
        app.run(host="0.0.0.0", port=80)
