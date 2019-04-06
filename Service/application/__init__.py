from flask import Flask
from flask_restful import Api
from application.model import movie
from application.model import studio


def create_app():

    app = Flask(__name__)
    api = Api(app)
    api.add_resource(movie.GetMovie, '/movie')
    api.add_resource(studio.ListStudios, '/studios')

    return app

