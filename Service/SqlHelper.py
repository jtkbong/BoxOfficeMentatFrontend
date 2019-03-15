def getSqlConnection():
    connection = pymysql.connect(host='boxofficementat.cwokc1guxfkk.us-west-2.rds.amazonaws.com',user='jtkbong',password='')
    return connection