from flask import request
from flask_restful import Resource
from werkzeug.exceptions import abort
from application.common import query
from application.common import condition
from application.common import sqlhelper


class Movie(Resource):

    def get(self, id):
        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()
        movie_query = query.Query()
        movie_query.set_table("Movies")
        movie_query.add_where_clause(condition.Condition('Id', '=', id))
        command = movie_query.to_sql_query()
        cursor.execute(command)

        movie = cursor.fetchone()

        if movie is None:
            abort(404, "Movie {0} doesn't exist.".format(id))

        return movie_to_json(movie)


class Movies(Resource):

    def get(self):

        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()
        movies_query = query.Query()
        movies_query.set_table("Movies")

        title = request.args.get('title')
        if title is not None:
            movies_query.add_where_clause(condition.Condition('Name', 'LIKE', "%" + title + "%"))

        studio = request.args.get('studio')
        if studio is not None:
            movies_query.add_where_clause(condition.Condition('Studio', '=', studio))

        person = request.args.get('person')
        if person is not None:
            subquery = query.Query()
            subquery.set_table("Credits")
            subquery.set_return_columns(["MovieId"])
            subquery.add_where_clause(condition.Condition("PersonId", "=", person))
            movies_query.add_subquery("Id", subquery)

        max_results = request.args.get('maxResults')
        if max_results is not None:
            movies_query.set_max_results(max_results)

        command = movies_query.to_sql_query()
        cursor.execute(command)

        movies = cursor.fetchall()
        return {'movies': [movie_to_json(movie) for movie in movies]}


class SearchMoviesByPerson(Resource):

    def get(self):
        person_id = request.args.get('id')
        relationship_type = request.args.get('relationshipType')

        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()

        search_query = query.Query()
        search_query.set_table("Movies")

        subquery = query.Query()
        subquery.set_table("Credits")
        subquery.set_return_columns(["MovieId"])
        subquery.add_where_clause(condition.Condition("PersonId", "=", person_id))
        subquery.add_where_clause(condition.Condition("Relationship", "=", relationship_type))

        search_query.add_subquery("Id", subquery)

        command = search_query.to_sql_query()
        cursor.execute(command)

        movies = cursor.fetchall()
        return {'movies': [movie_to_json(movie) for movie in movies]}


def movie_to_json(movie):
    return {
        'id': movie[0],
        'name': movie[1],
        'studio': movie[2],
        'domesticGross': movie[3],
        'distributor': movie[4],
        'releasedDate': movie[5].strftime('%m/%d/%Y'),
        'genre': movie[6],
        'runTime': movie[7],
        'mpaaRating': movie[8],
        'productionBudget': movie[9]
        }
