# from flask import Flask,request
from flask import Flask, request
from flask_cors import CORS, cross_origin
import mysql.connector
from hashlib import md5
from mysql.connector import Error
import pymysql
from flask import request, jsonify
import DatabaseConnection

import json

import SignUp
import locationPredictor
import LogIn


app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/user/<id>')
def user(id):
    if request.method == 'GET':
        print('user_id retrieved from CLIENT: ' + id)
        con = DatabaseConnection.connectdb()
        cur = con.cursor()
        cur.execute("SELECT * FROM users WHERE userId=%s", id)
        row = cur.fetchone()
        resp = jsonify(row)
        resp.status_code = 200
        return resp


@app.route('/update', methods=['POST'])
def update_user():
    try:
        con = DatabaseConnection.connectdb()
        cur = con.cursor()
        _json = request.json
        _id = _json['userId']
        _name = _json['username']
        _email = _json['email']
        _password = _json['password']
        _userLName = _json['userLName']
        _userFName = _json['userFName']
        _address = _json['address']
        # validate the received values
        if _name and _email and _password and _id and _userLName and _userFName and _address and request.method == 'POST':
            # save edits
            sql = "UPDATE users SET username=%s, userFName=%s, userLName=%s, address=%s, email=%s, password=%s WHERE userId=%s"
            data = (_name, _userFName, _userLName, _address, _email, _password, _id)
            cur.execute(sql, data)
            con.commit()
            resp = jsonify('User updated successfully!')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cur.close()
        con.close()



@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp



@app.route('/')
def hello_world():
    return 'Hello World This is Me. Yes Me!'


@app.route('/api/userlogin', methods=['POST'])
@cross_origin(supports_credentials=True)
def userlogin():
    if request.method == 'POST':
        data = request.get_json(force=True)
        username = data['name']
        print('username retrieved from CLIENT: ' + username)
        password = data['password']
        print('password retrieved from CLIENT: ' + password)
        print('Validating login details...')
        user = LogIn.LogIn(username, password)
        valid = user.login()
        return valid


@app.route('/api/newuser', methods=['POST'])
@cross_origin(supports_credentials=True)
def newuser():
    if request.method == 'POST':
        data = request.get_json(force=True)
        fname = data['fname']
        print('userfname retrieved from CLIENT: ' + fname)
        lname = data['lname']
        print('username retrieved from CLIENT: ' + lname)
        username = data['username']
        print('username retrieved from CLIENT: ' + username)
        email = data['email']
        print('username retrieved from CLIENT: ' + email)
        address = data['address']
        print('username retrieved from CLIENT: ' + address)
        password = data['password']
        print('password retrieved from CLIENT: ' + password)
        print('Registering User...')
        register = SignUp.SignUp(fname, lname, username, email, address, password)
        success = register.signup()
        print(success)
        return json.dumps({'fname': fname})


@app.route('/api/prediction', methods=['POST'])
def app_result():
    print("Received the Values....")
    data = request.get_json(force=True)
    print('Time Range:' + data['time'] + ' kwh:' + data['kwh'] + ' charger-type:' + data['chargerType'])
    print("Prediction In Pursuite...")
    # Prediction Obj Created to get the Prediction Result
    predictionObj = locationPredictor.predictor(data['time'], data['kwh'], data['chargerType'])
    predictionResult = predictionObj.predict()

    print('Prediction Sending...')
    return json.dumps({"newdata": predictionResult[0]})


if __name__ == '__main__':
    app.run()
