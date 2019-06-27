import pymysql

host='remotemysql.com'
user = 'Po4qKeSGWC'
password = 'hBuCoUlSwr'
db = 'Po4qKeSGWC'


def connectdb():
        try:
                con = pymysql.connect(host=host,user=user,password=password,db=db, use_unicode=True, charset='utf8', cursorclass=pymysql.cursors.DictCursor)
                print('Database connection successfull.')
                return con
        except Exception as e:
                print('Database connection failed.')