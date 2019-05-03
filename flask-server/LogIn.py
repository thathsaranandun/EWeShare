import DatabaseConnection


class LogIn:
    # class attribute
    category = "Login Class"

    # instance attribute
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def login(self):

        # Connect to the database
        connection = DatabaseConnection.connection

        try:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM users WHERE username = %s"
                try:
                    cursor.execute(sql, (self.username))
                    result = cursor.fetchall()
                    for row in result:
                        if row ['username'] == self.username:
                            if row ['password'] == self.password:
                                print("password is matching")
                                return 'true'
                            else:
                                print("invalid password")
                                return 'false'
                        else:
                            print("user not exist")
                            return 'false'

                except:
                    print("Oops! Something wrong")

            connection.commit()
        finally:
            connection.close()



            # con = DatabaseConnection.connectdb()
            # cur = con.cursor()
            # cur.execute("SELECT COUNT(1) FROM users WHERE username = %s;",[self.username])
            # if cur.fetchone()[0]:
            #     print('Correct username.')
            #     cur.execute("SELECT password FROM users WHERE username = %s;", [self.username])
            #     for row in cur.fetchall():
            #         if self.password == row[0]:
            #             print('Correct password. Valid login details')
            #             return 'true'
            #         else:
            #             print('Incorrect password.')
            #             return 'false'
            # else:
            #     print('Incorrect username.')
            #     return 'false'
