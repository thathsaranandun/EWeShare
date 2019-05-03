import pymysql

host='localhost'
user = 'root'
password = ''
db = 'sdgpdb'


connection = pymysql.connect(host=host,
                                             user=user,
                                             password=password,
                                             db=db,
                                             charset='utf8',
                                             cursorclass=pymysql.cursors.DictCursor)