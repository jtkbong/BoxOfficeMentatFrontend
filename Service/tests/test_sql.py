import pytest
from application.sqlhelper import get_sql_conn


def test_sql_conn():
    conn = get_sql_conn()
    assert conn is not None
