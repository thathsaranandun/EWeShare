import DatabaseConnection


class AddSite:
    # class attribute
    category = "Add Charging Site Class"

    # instance attribute
    def __init__(self, address, latitude, longitude, userId):
        self.address = address
        self.latitude = latitude
        self.longitude = longitude
        self.userId = userId

    def addSite(self):

        con = DatabaseConnection.connectdb()
        cur = con.cursor()
        cur.execute(
            """INSERT INTO 
                sites (
                    address,
                    latitude,
                    longitude,
                    userid)
            VALUES (%s,%s,%s,%s)""",
            (self.address, self.latitude, self.longitude, self.userId))
        con.commit()
        return 'Charging site added successfully.'
