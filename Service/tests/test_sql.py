from application.common import sqlhelper


def test_sql_conn():
    conn = sqlhelper.get_sql_conn()
    assert conn is not None
