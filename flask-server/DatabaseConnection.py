import pymysql

host='sql12.freemysqlhosting.net'
user = 'sql12293406'
password = 'zauPb3HEKt'
db = 'sql12293406'


def connectdb():
        try:
                con = pymysql.connect(host=host,user=user,password=password,db=db, use_unicode=True, charset='utf8', cursorclass=pymysql.cursors.DictCursor)
                print('Database connection successfull.')
                return con
        except Exception as e:
                print('Database connection failed.')