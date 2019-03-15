from Condition import Condition
import uuid
from asn1crypto._ffi import null

class Query:
    
    DefaultNumResults = 100
    
    def __init__(self):
        self.id = uuid.uuid4()
        self.table = None
        self.resultsOrder = None
        self.maxResults = Query.DefaultNumResults
        self.uniqueResults = False
        self.columns = []
        self.whereClauses = []
        self.subQueries = []
        self.orderByColumns = []
        self.innerQuery = None
        
    def setTable(self, table):
        self.table = table
        
    def setUniqueResults(self, uniqueResults):
        self.uniqueResults = uniqueResults    
    
    def setReturnColumns(self, columns):
        self.columns = columns
        
    def addWhereClause(self, condition):
        self.whereClauses.append(condition)
        
    def setOrderByColumns(self, columns):
        self.orderByColumns = columns
                
    def setResultsOrder(self, resultsOrder):
        self.resultsOrder = resultsOrder
                
    def setMaxResults(self, maxResults):
        self.maxResults = maxResults
                
    def addSubquery(self, column, subquery):
        self.subQueries.append([column, subquery])
    
    def toSqlQuery(self, includeLimit = True):
        
        if self.table == None:
            raise ValueError("Table not set for query.")
        
        query = "SELECT "
        
        if len(self.columns) > 0:
            if self.uniqueResults is True:
                query = query + " DISTINCT "
            query = query + ",".join(self.columns)
        else:
            query = query + "*"
            
        query = query + (" FROM boxofficementat.%s") % self.table
        
        if len(self.whereClauses) > 0 or len(self.subQueries) > 0:
        
            query = query + " WHERE "
        
            if len(self.whereClauses) > 0:
                whereClausesSql = []
                for whereClause in self.whereClauses:
                    whereClausesSql.append(whereClause.toSqlCondition())
                query = query + " AND ".join(whereClausesSql)
            
            if len(self.subQueries) > 0:
                subQueriesSql = []
                for column, subQuery in self.subQueries:
                    subQueriesSql.append(column + " IN (" + subQuery.toSqlQuery(False) + ")")
                if len(self.whereClauses) > 0:
                    query = query + " AND "
                query = query + " AND ".join(subQueriesSql)
        
        
        if len(self.orderByColumns) > 0:
            query = query + " ORDER BY " + ",".join(self.orderByColumns)
            if self.resultsOrder is not None:
                query = query + " " + self.resultsOrder

        if includeLimit:
            query = query + (" LIMIT %d") % int(self.maxResults)

        return query

def testQuery():
    query = Query()
    query.setTable("Movies")
    
    subquery1 = Query()
    subquery1.setTable("Credits")
    subquery1.setReturnColumns(["MovieId"])
    subquery1.addWhereClause(Condition("PersonId", "=", "chrisevans"))
    subquery1.addWhereClause(Condition("Relationship", "=", "Actor"))
    
    subquery2 = Query()
    subquery2.setTable("Credits")
    subquery2.setReturnColumns(["MovieId"])
    subquery2.addWhereClause(Condition("PersonId", "=", "chrishemsworth"))
    subquery2.addWhereClause(Condition("Relationship", "=", "Actor"))
    
    query.addSubquery("Id", subquery1)
    query.addSubquery("Id", subquery2)
    
    print(query.toSqlQuery())
    
testQuery()