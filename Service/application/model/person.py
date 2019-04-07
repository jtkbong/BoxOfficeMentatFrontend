from flask import request
from flask_restful import Resource
from application.common import query
from application.common import condition
from application.common import sqlhelper


class Person(Resource):
    def get(self, id):
        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()
        person_query = query.Query()
        person_query.set_table("People")
        person_query.add_where_clause(condition.Condition('Id', '=', id))
        command = person_query.to_sql_query()
        cursor.execute(command)

        person = cursor.fetchone()
        return person_to_json(person)


class SearchPeople(Resource):
    def get(self):
        name = request.args.get('name')
        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()

        search_query = query.Query()
        search_query.set_table("People")
        search_query.add_where_clause(condition.Condition("Name", "LIKE", "%" + name + "%"))

        command = search_query.to_sql_query()
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
