from flask import Flask
# from .database import init_db

# init_db()
app = Flask(__name__)

import server.routes
