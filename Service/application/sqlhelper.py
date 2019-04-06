import pymysql
from flask import Blueprint


bp = Blueprint('sqlhelper', __name__)


def get_sql_conn():
    connection = pymysql.connect(host='boxofficementat.cwokc1guxfkk.us-west-2.rds.amazonaws.com',
                                 user='jtkbong',
                                 password='$andr0ckGundam')
    return connection
