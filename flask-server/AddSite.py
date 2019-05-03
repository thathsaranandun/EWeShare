import DatabaseConnection


class AddSite:
    # class attribute
    category = "Add Charging Site Class"

    # instance attribute
    def __init__(self, address, latitude, longitude, userid):
        self.address = address
        self.latitude = latitude
        self.longitude = longitude
        self.userid = userid

    def addSite(self):

        con = DatabaseConnection.connectdb()
        cur = con.cursor()
        cur.execute(
            """INSERT INTO 
                sites (
                    address,
                    latitude,
                    longitude,
                    userId)
            VALUES (%s,%s,%s,%s)""",
            (self.address, self.latitude, self.longitude, self.userid))
        con.commit()
        return 'Charging site added successfully.'
