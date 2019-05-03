from flask import request

import DatabaseConnection


class SignUp:
    # class attribute
    category = "Login Class"

    # instance attribute
    def __init__(self, fname, lname, username, email, address, password):
        self.fname = fname
        self.lname = lname
        self.username = username
        self.email = email
        self.address = address
        self.password = password

    def signup(self):
        error = 'No errors'


        con = DatabaseConnection.connectdb()
        cur = con.cursor()
        cur.execute(
            """INSERT INTO 
                users (
                    userFName,
                    userLName,
                    email,
                    username,
                    address,
                    password)
            VALUES (%s,%s,%s,%s,%s,%s)""",
            (self.fname, self.lname, self.username, self.email, self.address, self.password))
        con.commit()
        return 'User Registration Successful.'
