from flask_restful import Resource
from application.common import query
from application.common import condition
from application.common import sqlhelper


class Credits(Resource):
    def get(self, movie_id):

        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()

        credits_query = query.Query()
        credits_query.set_table("People")

        subquery = query.Query()
        subquery.set_table("Credits")
        subquery.set_return_columns(["PersonId"])
        subquery.add_where_clause(condition.Condition("MovieId", "=", movie_id))
        subquery.add_where_clause(condition.Condition("Relationship", "=", "Actor"))

        credits_query.add_subquery("Id", subquery)

        command = credits_query.to_sql_query()
        cursor.execute(command)

        people = cursor.fetchall()
        return {'people': [person_to_json(person) for person in people]}


def person_to_json(person):
    return {
        'id': person[0],
        'name': person[1],
        'actor': person[2],
        'director': person[3],
        'producer': person[4],
        'screenWriter': person[5]
        }
