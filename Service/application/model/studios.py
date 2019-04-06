from flask_restful import Resource
from application.query import Query
from application.sqlhelper import get_sql_conn


class ListStudios(Resource):

    def get(self):
        connection = get_sql_conn()
        cursor = connection.cursor()
        query = Query()
        query.setTable("Movies")
        query.setUniqueResults(True)
        query.setReturnColumns(["Studio"])
        cursor.execute(query.toSqlQuery())
        return {'studios': [i[0] for i in cursor.fetchall()]}
