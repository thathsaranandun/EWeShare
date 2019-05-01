from flask import Flask,request
from flask_cors import CORS,cross_origin

import json

import SignUp
import locationPredictor
import LogIn

app = Flask(__name__)
CORS(app, support_credentials=True)






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
        user = LogIn.LogIn(username,password)
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
        print('username retrieved from CLIENT: '+username)
        email = data['email']
        print('username retrieved from CLIENT: ' + email)
        address = data['address']
        print('username retrieved from CLIENT: ' + address)
        password = data['password']
        print('password retrieved from CLIENT: '+password)
        print('Registering User...')
        register = SignUp.SignUp(fname,lname,username,email,address,password)
        success = register.signup()
        print(success)
        return json.dumps({'fname': fname})






@app.route('/api/prediction', methods = ['POST'])
def app_result():
    print("Received the Values....")
    data = request.get_json(force=True)
    print('Time Range:'+data['time']+' kwh:'+data['kwh']+' charger-type:'+data['chargerType'])
    print("Prediction In Pursuite...")
    #Prediction Obj Created to get the Prediction Result
    predictionObj = locationPredictor.predictor(data['time'],data['kwh'],data['chargerType'])
    predictionResult = predictionObj.predict()

    print('Prediction Sending...')
    return json.dumps({"newdata": predictionResult[0]})

if __name__ == '__main__':
    app.run()
