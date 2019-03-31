from flask import Flask, request
from flask_restful import Resource, Api
#from sqlalchemy import create_engine
import pymysql
from json import dumps
#from flask.ext.jsonpify import jsonify
from Query import Query
from Condition import Condition
from asn1crypto.x509 import TeletexPersonalName
from SqlHelper import getSqlConnection

#from ListStudios import ListStudios

application = app = Flask(__name__)
api = Api(app)

class GetPerson(Resource):
    def get(self):
        
        id = request.args.get('id')
        connection = getSqlConnection()
        cursor = connection.cursor()        
        query = Query()
        query.setTable("People")
        query.addWhereClause(Condition('Id', '=', id))
        command = query.toSqlQuery()
        cursor.execute(command)
        
        person = cursor.fetchone()
        return personObjToJson(person)

class GetMovie(Resource):
    def get(self):
        
        id = request.args.get('id')
        connection = getSqlConnection()
        cursor = connection.cursor()        
        query = Query()
        query.setTable("Movies")
        query.addWhereClause(Condition('Id', '=', id))
        command = query.toSqlQuery()
        cursor.execute(command)
        
        movie = cursor.fetchone()
        return movieObjToJson(movie)
        
class TopMoviesByBoxOffice(Resource):
    def get(self):
        
        studio = request.args.get('studio')
        person = request.args.get('person')
        maxResults = request.args.get('maxResults')
        
        connection = getSqlConnection()
        cursor = connection.cursor()
        query = Query()
        query.setTable("Movies")
        if studio is not None:
            query.addWhereClause(Condition('Studio', '=', studio))
        
        if person is not None:            
            subquery = Query()
            subquery.setTable("Credits")
            subquery.setReturnColumns(["MovieId"])
            subquery.addWhereClause(Condition("PersonId", "=", person))            
            query.addSubquery("Id", subquery)
        
        if maxResults is not None:
            query.setMaxResults(maxResults)
            
        query.setOrderByColumns(["DomesticGross"])
        query.setResultsOrder("DESC")
            
        command = query.toSqlQuery()
        print(command)
        cursor.execute(command)
        
        movies = cursor.fetchall()        
        return {'movies': [movieObjToJson(movie) for movie in movies]}

class SearchMoviesByTitle(Resource):
    def get(self):
        
        title = request.args.get('title')
        connection = getSqlConnection()
        cursor = connection.cursor()        
        query = Query()
        query.setTable("Movies")
        query.addWhereClause(Condition('Name', 'LIKE', "%" + title + "%"))
        command = query.toSqlQuery()
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
        connection = getSqlConnection()
        cursor = connection.cursor()
        
        query = Query()
        query.setTable("People")
        query.addWhereClause(Condition("Name", "LIKE", "%" + name + "%"))
        
        command = query.toSqlQuery()
        print(command)
        cursor.execute(command)
        
        people = cursor.fetchall()        
        return {'people': [personObjToJson(person) for person in people]}
    
class GetMovieCredits(Resource):
    def get(self):
        
        movieId = request.args.get('movieId')
        connection = getSqlConnection()
        cursor = connection.cursor()
        
        query = Query()
        query.setTable("People")
        
        subquery = Query()
        subquery.setTable("Credits")
        subquery.setReturnColumns(["PersonId"])
        subquery.addWhereClause(Condition("MovieId", "=", movieId))
        subquery.addWhereClause(Condition("Relationship", "=", "Actor"))
        
        query.addSubquery("Id", subquery)
        
        command = query.toSqlQuery()
        cursor.execute(command)
        
        people = cursor.fetchall()        
        return {'people': [personObjToJson(person) for person in people]}
    
def SearchMoviesByPersonWithRelationship(personId, relationshipType):
    
    connection = getSqlConnection()
    cursor = connection.cursor()
    
    query = Query()
    query.setTable("Movies")
    
    subquery = Query()
    subquery.setTable("Credits")
    subquery.setReturnColumns(["MovieId"])
    subquery.addWhereClause(Condition("PersonId", "=", personId))
    subquery.addWhereClause(Condition("Relationship", "=", relationshipType))
    
    query.addSubquery("Id", subquery)
    
    command = query.toSqlQuery()
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

if __name__ == '__main__':
     app.run(port='5002')