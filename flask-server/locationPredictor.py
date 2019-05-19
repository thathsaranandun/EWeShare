# Load libraries
import DatabaseConnection
import pandas
from pandas.plotting import scatter_matrix
#import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVR, SVC

class predictor:
    # class attribute
    category = "Prediction Class"

    # instance attribute
    def __init__(self, time, kwh, chargerType):
        self.time = time
        self.kwh = kwh
        self.chargerType = chargerType

    # Prediction Method
    # returns the predicted Location
    def predict(self):
        names = ['Time', 'kwh', 'type', 'site']
        data = pandas.read_csv('removed0kwh30min.csv', names=names)
        array = data.values

        X = array[:, 0:3]

        Y = array[:, 3]

        test_size = 0.2
        seed = 9
        X_train, X_test, Y_train, Y_test = model_selection.train_test_split(X, Y, test_size=test_size,
                                                                            random_state=seed)
        clf = SVC(C=30.0, cache_size=200, class_weight=None, coef0=0.0,
                  decision_function_shape='ovo', degree=3, gamma='scale', kernel='rbf',
                  max_iter=-1, probability=False, random_state=None, shrinking=False,
                  tol=1e-4, verbose=False)

        model = clf.fit(X_train, Y_train)
        # Create new observation
        new_observation = [[self.time, self.kwh, self.chargerType]]

        # Predict class
        print('Prediction Accuracy:')
        output = model.predict(X_test)

        acc = accuracy_score(Y_test, output.round())
        print(acc)

        singlePred = model.predict(new_observation)
        print('Predicted Location Id')
        print(singlePred)

        return singlePred

    # Validation of User Inputs
    # returns an array of validation details
    def validate(self):
        validityInputFields="Please Fill all the details"
        validityString = "Please Enter a number, Not a word"
        validityTimeRange = "Please Enter a Time less than 31 minutes"

        """
        if(self.time.isdigit() and self.kwh.isdigit()):
            print('All the Input Values are Numbers')
        else:
            print ('Input Contains String Values, Invalid!')
            message = {"errorMsg": validityString, "valid": False}
            return message
        """

        if (int(self.time) > 30):
            print('Input Time Range is Invalid!')
            message = {"errorMsg": validityTimeRange, "valid": False}
            print(message)
            return message
        else:
            message = {"valid": True}
            return message

        #Getting the location details from database
    def locationDetails(self,predId):
        # Connect to the database
        connection = DatabaseConnection.connectdb()

        try:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM sites WHERE siteid = %s"
                try:
                    cursor.execute(sql, predId)
                    result = cursor.fetchall()
                    for row in result:
                        print('in location predictor'+ row['address'])
                        message = {"lat":row['latitude'],"lon":row['longitude'],"address":row['address']}
                        return message
                except:
                    print("DB Querry Failed!")

        except:
            print('Connection to db failed!')
