from flask import Flask
from flask_restful import Api
from application.model import studio
from application.model import movie
from application.model import person
from application.model import credit


def create_app():
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(studio.Studio, '/studios/<id>')
    api.add_resource(studio.Studios, '/studios')

    api.add_resource(movie.Movie, '/movie/<id>')
    api.add_resource(movie.Movies, '/movies')

    api.add_resource(person.Person, '/person/<id>')
    api.add_resource(person.SearchPeople, '/people')

    api.add_resource(credit.Credits, '/credits/<movie_id>')

    return app


application = create_app()


@application.after_request
def add_cors_header(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# if __name__ == '__main__':
#      app.run(port='5002')