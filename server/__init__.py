from flask import Flask

# init_db()
app = Flask(__name__)

import server.database
import server.routes
