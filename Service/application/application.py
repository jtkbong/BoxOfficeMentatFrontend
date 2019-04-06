from flask import Flask
from flask_restful import Api
from application.model import studio
from application.model import movie
from application.model import person
from application.model import credit


def create_application():
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(studio.ListStudios, '/studios')
    api.add_resource(movie.GetMovie, '/movie')
    api.add_resource(person.GetPerson, '/person')
    api.add_resource(movie.TopMoviesByBoxOffice, '/topMoviesByBoxOffice')
    api.add_resource(movie.SearchMoviesByTitle, '/movies')
    api.add_resource(movie.SearchMoviesByPerson, '/moviesByPerson')
    api.add_resource(credit.GetMovieCredits, '/movieCredits')
    api.add_resource(person.SearchPeople, '/people')

    return app


application = create_application()


@application.after_request
def add_cors_header(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# if __name__ == '__main__':
#      app.run(port='5002')
