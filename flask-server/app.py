from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import json
import AddSite
import DatabaseConnection
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
        user = LogIn.LogIn(username, password)
        loggeduser = user.login()
        print('logged user json object: ' + loggeduser)
        return loggeduser


@app.route('/api/addsite', methods=['POST'])
@cross_origin(supports_credentials=True)
def addsite():
    if request.method == 'POST':
        data = request.get_json(force=True)
        address = data['address']
        print('address retrieved from CLIENT: ' + address)
        latitude = data['latitude']
        print('latitude retrieved from CLIENT: ' + latitude)
        longitude = data['longitude']
        print('longitude retrieved from CLIENT: ' + longitude)
        userId = data['userId']
        print('userId retrieved from CLIENT: ' + str(userId))
        print('Adding site details...')
        site = AddSite.AddSite(address, latitude, longitude, userId)
        done = site.addsite()
        print('Site added successfully.')
        return json.dumps({'done': done})


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
    print('Input is being Validated')
    # Prediction Obj Created to get the Prediction Result
    predictionObj = locationPredictor.predictor(data['time'], data['kwh'], data['chargerType'])
    validation = predictionObj.validate()

    if (validation['valid']):
        print("Prediction In Pursuite...")
        predictionResult = predictionObj.predict()
        locationDetails = predictionObj.locationDetails(predictionResult[0])
        print('Prediction Sending...')
        print('Prediction Suxxesful')
        return json.dumps(
            {"location": {"lat": locationDetails['lat'], "lon": locationDetails['lon']},
             "locdetails": locationDetails['address'], "valid": validation['valid']})

        """
        # return json.dumps({"newdata": predictionResult[0],"location":{"lat":56.4881,"lon":3.0146},"locdetails":'Ardler Complex,Dundee'})
        location = "Ardler Complex,Dundee"
        return json.dumps(
            {"location": {"lat": 56.4881, "lon": -2.97489}, "locdetails": location, "valid": validation['valid']})
        """
    else:
        return json.dumps(validation)


@app.route('/user/<id>')
def user(id):
    if request.method == 'GET':
        print('user_id retrieved from CLIENT: ' + id)
        # Connect to the database
        connection = DatabaseConnection.connection
        valid = 'false';

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE userId=%s", id)
                row = cursor.fetchone()
                resp = jsonify(row)
                resp.status_code = 200
                return resp
        except:
            print('Connection to db failed')


@app.route('/update', methods=['POST'])
def update_user():
    try:
        con = DatabaseConnection.connection
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


if __name__ == '__main__':
    app.run()
