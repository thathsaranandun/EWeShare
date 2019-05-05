# class attribute
import json

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
                location=''
                result = cursor.fetchall()
                for row in result:
                    latitude=row['latitude']
                    longitude=row['longitude']
                    port=row['port_type']
                    location += latitude+longitude+port+','
                return json.dumps({'location':location})


            except:
                print("Oops! Something wrong")
                location=''
                return json.dumps({'location': location})


    except:
        print('Connection to db failed')