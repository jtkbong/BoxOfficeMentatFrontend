import pymysql
import time

maxTries = 3


def write_rows_to_db_retries(table_name, column_names, rows):
    connection = get_sql_conn()
    cursor = connection.cursor()   
    for row in rows:
        num_tries = 0
        success = False
        while num_tries < maxTries and not success:
            try:
                write_row_to_db(cursor, table_name, column_names, row)
                success = True
            except pymysql.err.IntegrityError:
                print("Integrity Error")
                errors = open('/writeErrors.txt', 'a')
                errors.write('Integrity Error: %s, %s, %s\n' % (table_name, column_names, ','.join(rows)))
                break
            except pymysql.err.OperationalError:
                print("Operational Error")
                time.sleep(30)
                num_tries += 1
                continue
        if num_tries == maxTries and not success:
            errors = open('/writeErrors.txt', 'a')
            errors.write('Max Tries Reached: %s, %s, %s\n' % (table_name, column_names, ','.join(rows)))
    connection.commit()
    connection.close()


def write_row_to_db(cursor, table_name, column_names, row):
    command = 'INSERT INTO boxofficementat.' + table_name + '(' + ','.join(column_names) + \
              ') VALUES (' + ','.join(['%s'] * len(column_names)) + ')'
    cursor.execute(command, (row.split('\t')))


def clear_database(table_name):
    connection = get_sql_conn()
    cursor = connection.cursor()   
    command = 'DELETE FROM boxofficementat.' + table_name + ' WHERE Id IS NOT NULL;'
    cursor.execute(command)
    connection.commit()
    connection.close()


def get_sql_conn():
    connection = pymysql.connect(host='boxofficementat.cwokc1guxfkk.us-west-2.rds.amazonaws.com',
                                 user='jtkbong',password='$andr0ckGundam')
    return connection
