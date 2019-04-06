from flask import Flask
from flask_restful import Api
from application import movie


def create_app():

    app = Flask(__name__)
    api = Api(app)
    api.add_resource(movie.GetMovie, '/movie')

    return app

