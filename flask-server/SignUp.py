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
    # Function for Performing Signup or returning error message
    def signup(self):
        message = SignUp.validateSignup(self)
        if(message['supValid']):
            con = DatabaseConnection.connection
            cur = con.cursor()
            sql="INSERT INTO users(userFName,userLName,email,username,address,password)VALUES( % s, % s, % s, % s, % s, % s)"
            cur.execute(sql,(self.fname, self.lname, self.username, self.email, self.address, self.password))
            con.commit()
            msg='User Registration Successful'
            return {'mesg':msg,'isvalid':True}
        else:
            msg = 'Duplicate email, Please use a different email'
            return {'mesg': msg, 'isvalid': False}

    # Function for Validating the uniqueness of the email
    def validateSignup(self):
        message = {'supValid': False}
        con = DatabaseConnection.connection
        cur = con.cursor()
        sql = "SELECT * From users WHERE email=%s"
        row_count = cur.execute(sql,self.email)
        print('Results Fetched form users table, email validation in progress')
        if(row_count == 0):
            print('email entered by user is unique')
            message = {'supValid': True}
            return message
        else:
            message = {'supValid': False}
            return message

