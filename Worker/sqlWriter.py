import pymysql
import glob
import time
from _mysql import IntegrityError

maxTries = 3

def writeRowsToDatabaseWithRetries(tableName, columnNames, rows):
    connection = getSqlConnection()
    cursor = connection.cursor()   
    for row in rows:
        numTries = 0
        success = False
        while numTries < maxTries and not success:
            try:
                writeRowToDatabase(cursor, tableName, columnNames, row)
                success = True
            except pymysql.err.IntegrityError:
                print("Integrity Error")
                errors = open(Common.getDataDir() + '/writeErrors.txt', 'a')
                errors.write('Integrity Error: %s, %s, %s\n' % (tableName, columnNames, ','.join(rows)))
                break
            except pymysql.err.OperationalError:
                print("Operational Error")
                time.sleep(30)
                numTries += 1
                continue
        if numTries == maxTries and not success:
            errors = open(Common.getDataDir() + '/writeErrors.txt', 'a')
            errors.write('Max Tries Reached: %s, %s, %s\n' % (tableName, columnNames, ','.join(rows)))
    connection.commit()
    connection.close()

def writeRowToDatabase(cursor, tableName, columnNames, row):
    command = 'INSERT INTO boxofficementat.' + tableName + '(' + ','.join(columnNames) + ') VALUES (' + ','.join(['%s'] * len(columnNames)) + ')' 
    cursor.execute(command, (row.split('\t')))
    
def clearDatabase(tableName):
    connection = getSqlConnection()
    cursor = connection.cursor()   
    command = 'DELETE FROM boxofficementat.' + tableName + ' WHERE Id IS NOT NULL;'
    cursor.execute(command)
    connection.commit()
    connection.close()
    
def getSqlConnection():
    connection = pymysql.connect(host='boxofficementat.cwokc1guxfkk.us-west-2.rds.amazonaws.com',user='jtkbong',password='$andr0ckGundam')
    return connection
