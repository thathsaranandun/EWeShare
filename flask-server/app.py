from flask import Flask,request
from flask_cors import CORS
import json
import locationPredictor

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello World This is geethTHEgeek!'

@app.route('/api/prediction', methods = ['POST'])
def app_result():
    print("Received the Values....")
    data = request.get_json(force=True)
    print('Time Range:'+data['time']+' kwh:'+data['kwh']+' charger-type:'+data['chargerType'])
    print('Input is being Validated')
    # Prediction Obj Created to get the Prediction Result
    predictionObj = locationPredictor.predictor(data['time'],data['kwh'],data['chargerType'])
    validation = predictionObj.validate()

    if(validation['valid']):
        print("Prediction In Pursuite...")
        #predictionResult = predictionObj.predict()
        print('Prediction Sending...')
        #return json.dumps({"newdata": predictionResult[0],"location":{"lat":56.4881,"lon":3.0146},"locdetails":'Ardler Complex,Dundee'})
        location ="Ardler Complex,Dundee"
        return json.dumps({"location":{"lat":56.4881,"lon":3.0146},"locdetails":location,"valid":validation['valid']})
    else:
        return json.dumps(validation)


if __name__ == '__main__':
    app.run()
