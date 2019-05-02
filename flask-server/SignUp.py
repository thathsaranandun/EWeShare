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

        with DatabaseConnection.connectdb().cursor() as cursor:
            sql = "SELECT * FROM users WHERE username =%s"
            cursor.execute(sql, (self.username,))
            result = cursor.fetchall()
            row_count =cursor.rowcount

            if row_count == 1:  #checking the usernam exist
                return 'Username is already exists'
            else:
                if len(self.password) <= 6: #check password legth
                    return 'Password is too short'
                else:
                    j=0
                    for i in range(0 ,len(self.email)):
                        if self.email[i] == '@':
                            j=1
                    if j ==1:   #email validation
                        #querry for inserting user details
                        insert_sql="""INSERT INTO
                                    users (
                                    userFName,
                                    userLName,
                                    email,
                                    username,
                                    address,
                                    password)
                                    VALUES (%s,%s,%s,%s,%s,%s)"""
                        cursor.execute(insert_sql,(self.fname, self.lname, self.username, self.email, self.address, self.password))
                        DatabaseConnection.connectdb().commit()
                        return 'User Registration Successful.'
                    else:
                        return 'invalid email address'
        DatabaseConnection.connectdb().close()

