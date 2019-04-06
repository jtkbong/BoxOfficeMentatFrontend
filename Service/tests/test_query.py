from application.common.query import Query
from application.common.condition import Condition


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

    assert query is not None
