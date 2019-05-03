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
        user_exist = True
        # Connect to the database
        connection = DatabaseConnection.connection

        try:
            with connection.cursor() as cursor:
                sql_1 = "SELECT * FROM users WHERE username = %s"
                try:
                    cursor.execute(sql_1, (self.username))
                    result = cursor.fetchall()
                    for row in result:
                        if row['username'] != self.username:
                            user_exist = False
                        else:
                            return "user already exist"

                except:
                    print("Oops! Something wrong")

            connection.commit()
        finally:
            connection.close()

        try:
            with connection.cursor() as cursor2:
                sql_2 = "INSERT INTO users ( userFName, userLName, email, username,address, password) VALUES (%s,%s,%s,%s,%s,%s)"
                try:
                    if not user_exist:
                        cursor2.execute(sql_2,(self.fname, self.lname, self.username, self.email, self.address, self.password))
                        print("Task added successfully")
                        return "user added to data base"
                    else:
                        return "user already exist"
                except:
                    print("Oops! Something wrong")

            connection.commit()
        finally:
            connection.close()

        # with connection.cursor() as cursor:
        #     sql = "INSERT INTO users ( userFName, userLName, email, username,address, password) VALUES (%s,%s,%s,%s,%s,%s)"
        #     try:
        #         cursor.execute(sql, (self.fname, self.lname, self.username, self.email, self.address, self.password))
        #         print("user details added successfully")
        #     except:
        #         print("Oops! can't insert user details to data base")

        # error = 'No errors'
        #
        #
        # con = DatabaseConnection.connectdb()
        # cur = con.cursor()
        # cur.execute(
        #     """INSERT INTO
        #         users (
        #             userFName,
        #             userLName,
        #             email,
        #             username,
        #             address,
        #             password)
        #     VALUES (%s,%s,%s,%s,%s,%s)""",
        #     (self.fname, self.lname, self.username, self.email, self.address, self.password))
        # con.commit()
        # return 'User Registration Successful.'
