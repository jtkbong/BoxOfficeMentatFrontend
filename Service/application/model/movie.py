from flask import request
from flask_restful import Resource
from application.common import query
from application.common import condition
from application.common import sqlhelper


class GetMovie(Resource):
    def get(self):
        movie_id = request.args.get('id')
        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()
        movie_query = query.Query()
        movie_query.set_table("Movies")
        movie_query.add_where_clause(condition.Condition('Id', '=', movie_id))
        command = movie_query.to_sql_query()
        cursor.execute(command)

        movie = cursor.fetchone()
        return movie_to_json(movie)


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
