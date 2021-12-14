# DEPENDENCIAS FLASK
from flask import Flask
from flask import request
from flask import jsonify
from flask import render_template
from flask_cors import CORS, cross_origin
from flask import session

# PETICIONES HTTP
import requests

# JSON WEB TOKEN FRAMEWORK
import jwt

# OTHER LIBRARIES
from functools import wraps
from datetime import datetime, timedelta

# APPLICATION CONFIGURATION
from config.config import config

# REGISTER PATHS OF BLUEPRINTS
from blueprints.modelos_blueprint import model_blueprint

app = Flask(__name__)
app.register_blueprint(model_blueprint)

def pagina_no_encontrada(error):
    return "<h1>La pagina que intentas buscar no existe .. </h1>"


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()
