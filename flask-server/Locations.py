# class attribute
import json

from flask.json import jsonify

import DatabaseConnection



def getlocations():

    # Connect to the database
    connection = DatabaseConnection.connection
    valid='false'

    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM chargers"
            try:
                cursor.execute(sql)
                result = cursor.fetchall()
                return result


            except:
                print("Failed to query chargers table.")
                return 'quering failed'


    except:
        print('Connection to db failed')