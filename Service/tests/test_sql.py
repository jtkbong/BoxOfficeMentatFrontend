from application.common import sqlhelper


def test_sql_conn():
    conn = sqlhelper.get_sql_conn()
    assert conn is not None
    host_info = conn.get_host_info()
    assert host_info == 'socket boxofficementat.cwokc1guxfkk.us-west-2.rds.amazonaws.com:3306'
