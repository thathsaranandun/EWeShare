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

        # connection = DatabaseConnection.connection
        # cursor = connection.cursor()
        # sql_1 = "SELECT COUNT(1) FROM users WHERE username = %s;"
        # cursor.execute(sql_1, [self.username])
        # if cursor.fetchone()[0]:
        #     return 'username already exist'
        # else:
        #     sql_2 = "INSERT INTO users ( userFName, userLName, email, username,address, password) VALUES (%s,%s,%s,%s,%s,%s);"
        #     cursor.execute(sql_2, (self.fname, self.lname, self.email, self.username, self.address, self.password ))
        #     return 'User Registration Successful'


        # Connect to the database
        connection = DatabaseConnection.connection
        user_exis = True
        try:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM users WHERE username = %s;"
                try:
                    cursor.execute(sql, (self.username))
                    result = cursor.fetchall()
                    print(cursor.rowcount)
                    if cursor.rowcount == 0:
                        user_exis = False
                        print('valid user name')
                        
                    else:
                        return 'user name already exist'

                except:
                    print("Oops! Something wrong")

            with connection.cursor() as cursor:
                #sql_2 = "INSERT INTO users ( userFName, userLName, email, username,address, password) VALUES (%s,%s,%s,%s,%s,%s);"
                sql_2 = "INSERT INTO users ('username','password') VALUES (%s,%s);"
                try:
                    if not user_exis:
                        print("error7")
                        cursor.execute(
                            """INSERT INTO
                                users (
                                    userFName,
                                    userLName,
                                    email,
                                    username,
                                    address,
                                    password)
                            VALUES (%s,%s,%s,%s,%s,%s);""",
                            (self.fname, self.lname, self.email, self.username, self.address, self.password))
                        return 'User Registration Successful.'
                    else:
                        print("error8")
                        return "user already exist"
                except :
                    print("Oops! Something wrong")

            print('before connection commit')
            connection.commit()
        finally:
            connection.close()

        # con = DatabaseConnection.connection
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
