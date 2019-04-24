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
    print("Prediction In Pursuite...")
    #Prediction Obj Created to get the Prediction Result
    predictionObj = locationPredictor.predictor(data['time'],data['kwh'],data['chargerType'])
    predictionResult = predictionObj.predict()

    print('Prediction Sending...')
    return json.dumps({"newdata": predictionResult[0]})

if __name__ == '__main__':
    app.run()
