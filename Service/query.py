from condition import Condition
import uuid


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
        
    def set_table(self, table):
        self.table = table
        
    def set_unique_results(self, unique_results):
        self.uniqueResults = unique_results
    
    def set_return_columns(self, columns):
        self.columns = columns
        
    def add_where_clause(self, condition):
        self.whereClauses.append(condition)
        
    def set_order_by_columns(self, columns):
        self.orderByColumns = columns
                
    def set_results_order(self, results_order):
        self.resultsOrder = results_order
                
    def set_max_results(self, max_results):
        self.maxResults = max_results
                
    def add_subquery(self, column, subquery):
        self.subQueries.append([column, subquery])
    
    def to_sql_query(self, include_limit=True):
        
        if self.table is None:
            raise ValueError("Table not set for query.")
        
        query = "SELECT "
        
        if len(self.columns) > 0:
            if self.uniqueResults is True:
                query = query + " DISTINCT "
            query = query + ",".join(self.columns)
        else:
            query = query + "*"
            
        query = query + " FROM boxofficementat.%s" % self.table
        
        if len(self.whereClauses) > 0 or len(self.subQueries) > 0:
        
            query = query + " WHERE "
        
            if len(self.whereClauses) > 0:
                where_clauses_sql = []
                for whereClause in self.whereClauses:
                    where_clauses_sql.append(whereClause.to_sql_condition())
                query = query + " AND ".join(where_clauses_sql)
            
            if len(self.subQueries) > 0:
                sub_queries_sql = []
                for column, subQuery in self.subQueries:
                    sub_queries_sql.append(column + " IN (" + subQuery.to_sql_query(False) + ")")
                if len(self.whereClauses) > 0:
                    query = query + " AND "
                query = query + " AND ".join(sub_queries_sql)

        if len(self.orderByColumns) > 0:
            query = query + " ORDER BY " + ",".join(self.orderByColumns)
            if self.resultsOrder is not None:
                query = query + " " + self.resultsOrder

        if include_limit:
            query = query + " LIMIT %d" % int(self.maxResults)

        return query


def test_query():
    query = Query()
    query.set_table("Movies")
    
    subquery1 = Query()
    subquery1.set_table("Credits")
    subquery1.set_return_columns(["MovieId"])
    subquery1.add_where_clause(Condition("PersonId", "=", "chrisevans"))
    subquery1.add_where_clause(Condition("Relationship", "=", "Actor"))
    
    subquery2 = Query()
    subquery2.set_table("Credits")
    subquery2.set_return_columns(["MovieId"])
    subquery2.add_where_clause(Condition("PersonId", "=", "chrishemsworth"))
    subquery2.add_where_clause(Condition("Relationship", "=", "Actor"))
    
    query.add_subquery("Id", subquery1)
    query.add_subquery("Id", subquery2)
    
    print(query.to_sql_query())


test_query()
