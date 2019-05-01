import pymysql

host='localhost'
user = 'root'
password = ''
db = 'sdgpdb'

try:
        con = pymysql.connect(host=host,user=user,password=password,db=db, use_unicode=True, charset='utf8')
        print('Database connection successfull.')
except Exception as e:
        print('Database connection failed.')