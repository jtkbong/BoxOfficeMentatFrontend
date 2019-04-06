from flask_restful import Resource
from application.common import query
from application.common import sqlhelper


class ListStudios(Resource):

    def get(self):
        connection = sqlhelper.get_sql_conn()
        cursor = connection.cursor()
        studios_query = query.Query()
        studios_query.set_table("Movies")
        studios_query.set_unique_results(True)
        studios_query.set_return_columns(["Studio"])
        cursor.execute(studios_query.to_sql_query())
        return {'studios': [i[0] for i in cursor.fetchall()]}
