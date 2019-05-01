from flask import request
import DatabaseConnection
import mysql.connector
from hashlib import md5
from mysql.connector import Error
import pymysql


class LogIn:
    # class attribute
    category = "Login Class"

    # instance attribute
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def login(self):

            con = DatabaseConnection.connectdb()
            cur = con.cursor()
            cur.execute("SELECT COUNT(1) FROM users WHERE username = %s;",[self.username])
            if cur.fetchone()[0]:
                print('Correct username.')
                cur.execute("SELECT password FROM users WHERE username = %s;", [self.username])
                for row in cur.fetchall():
                    if self.password == row[0]:
                        print('Correct password. Valid login details')
                        return 'true'
                    else:
                        print('Incorrect password.')
                        return 'false'
            else:
                print('Incorrect username.')
                return 'false'
