import pymysql
import configparser


def get_sql_conn():

    config = configparser.ConfigParser()
    config.read('service.ini')
    db_info = config['db']
    db_host = db_info['dbhost']
    db_user = db_info['dbuser']
    db_password = db_info['dbpassword']

    connection = pymysql.connect(host=db_host, user=db_user, password=db_password)
    return connection
