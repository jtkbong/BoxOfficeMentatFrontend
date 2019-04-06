from flask import Flask, request
from flask_restful import Resource, Api
from application.query import Query
from application.condition import Condition
from application.sqlhelper import get_sql_conn
from application.movie import GetMovie

#from ListStudios import ListStudios

application = app = Flask(__name__)
api = Api(app)


class GetPerson(Resource):
    def get(self):
        
        id = request.args.get('id')
        connection = get_sql_conn()
        cursor = connection.cursor()        
        query = Query()
        query.set_table("People")
        query.add_where_clause(Condition('Id', '=', id))
        command = query.to_sql_query()
        cursor.execute(command)
        
        person = cursor.fetchone()
        return personObjToJson(person)


class TopMoviesByBoxOffice(Resource):
    def get(self):
        
        studio = request.args.get('studio')
        person = request.args.get('person')
        maxResults = request.args.get('maxResults')
        
        connection = get_sql_conn()
        cursor = connection.cursor()
        query = Query()
        query.set_table("Movies")
        if studio is not None:
            query.add_where_clause(Condition('Studio', '=', studio))
        
        if person is not None:            
            subquery = Query()
            subquery.set_table("Credits")
            subquery.set_return_columns(["MovieId"])
            subquery.add_where_clause(Condition("PersonId", "=", person))
            query.add_subquery("Id", subquery)
        
        if maxResults is not None:
            query.set_max_results(maxResults)
            
        query.set_order_by_columns(["DomesticGross"])
        query.set_results_order("DESC")
            
        command = query.to_sql_query()
        print(command)
        cursor.execute(command)
        
        movies = cursor.fetchall()        
        return {'movies': [movieObjToJson(movie) for movie in movies]}


class SearchMoviesByTitle(Resource):
    def get(self):
        
        title = request.args.get('title')
        connection = get_sql_conn()
        cursor = connection.cursor()        
        query = Query()
        query.set_table("Movies")
        query.add_where_clause(Condition('Name', 'LIKE', "%" + title + "%"))
        command = query.to_sql_query()
        print(command)
        cursor.execute(command)
        
        movies = cursor.fetchall()        
        return {'movies': [movieObjToJson(movie) for movie in movies]}


class SearchMoviesByActor(Resource):
    def get(self):
        actorId = request.args.get('actorId')
        return SearchMoviesByPersonWithRelationship(actorId, "Actor")


class SearchMoviesByDirector(Resource):
    def get(self):
        directorId = request.args.get('directorId')
        return SearchMoviesByPersonWithRelationship(directorId, "Director")


class SearchMoviesByProducer(Resource):
    def get(self):
        directorId = request.args.get('producerId')
        return SearchMoviesByPersonWithRelationship(directorId, "Producer")


class SearchMoviesByWriter(Resource):
    def get(self):
        directorId = request.args.get('writerId')
        return SearchMoviesByPersonWithRelationship(directorId, "Writer")


class SearchPeople(Resource):
    def get(self):
        name = request.args.get('name')
        connection = get_sql_conn()
        cursor = connection.cursor()
        
        query = Query()
        query.set_table("People")
        query.add_where_clause(Condition("Name", "LIKE", "%" + name + "%"))
        
        command = query.to_sql_query()
        print(command)
        cursor.execute(command)
        
        people = cursor.fetchall()        
        return {'people': [personObjToJson(person) for person in people]}


class GetMovieCredits(Resource):
    def get(self):
        
        movieId = request.args.get('movieId')
        connection = get_sql_conn()
        cursor = connection.cursor()
        
        query = Query()
        query.set_table("People")
        
        subquery = Query()
        subquery.set_table("Credits")
        subquery.set_return_columns(["PersonId"])
        subquery.add_where_clause(Condition("MovieId", "=", movieId))
        subquery.add_where_clause(Condition("Relationship", "=", "Actor"))
        
        query.add_subquery("Id", subquery)
        
        command = query.to_sql_query()
        cursor.execute(command)
        
        people = cursor.fetchall()        
        return {'people': [personObjToJson(person) for person in people]}


def SearchMoviesByPersonWithRelationship(personId, relationshipType):
    
    connection = get_sql_conn()
    cursor = connection.cursor()
    
    query = Query()
    query.set_table("Movies")
    
    subquery = Query()
    subquery.set_table("Credits")
    subquery.set_return_columns(["MovieId"])
    subquery.add_where_clause(Condition("PersonId", "=", personId))
    subquery.add_where_clause(Condition("Relationship", "=", relationshipType))
    
    query.add_subquery("Id", subquery)
    
    command = query.to_sql_query()
    cursor.execute(command)
    
    movies = cursor.fetchall()        
    return {'movies': [movieObjToJson(movie) for movie in movies]}    


def movieObjToJson(movie):
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


def personObjToJson(person):
    return {
        'id': person[0], 
        'name': person[1],
        'actor': person[2],
        'director': person[3],
        'producer': person[4],
        'screenWriter': person[5]
        }


#api.add_resource(ListStudios, '/studios')
api.add_resource(GetMovie, '/movie')
api.add_resource(GetPerson, '/person')
api.add_resource(TopMoviesByBoxOffice, '/topMoviesByBoxOffice')
api.add_resource(SearchMoviesByTitle, '/movies')
api.add_resource(SearchMoviesByActor, '/moviesByActor')
api.add_resource(SearchMoviesByDirector, '/moviesByDirector')
api.add_resource(SearchMoviesByProducer, '/moviesByProducer')
api.add_resource(SearchMoviesByWriter, '/moviesByWriter')
api.add_resource(GetMovieCredits, '/movieCredits')
api.add_resource(SearchPeople, '/people')


@app.after_request
def addCorsHeader(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


#if __name__ == '__main__':
#     app.run(port='5002')
